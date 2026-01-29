import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useFormContext } from '../../context/FormContext';
import { getFieldValue, getFieldError, getFieldTouched, getNestedProperty } from '../../utils/formik.utils';
import { FieldWrapper } from '../shared/FieldWrapper';
import { FieldLabel } from '../shared/FieldLabel';
import { FieldDescription } from '../shared/FieldDescription';
import { FieldError } from '../shared/FieldError';
import { IconRenderer } from '../shared/IconRenderer';
import { formatString } from '../../utils/field.utils';
import { EditableDivFieldConfig } from '../../types/field.types';
import { useTranslation } from '../../hooks/useTranslation';

/**
 * EditableDivField Component
 * Renders a contentEditable div with field insertion capabilities
 * 
 * This is a complex component that allows users to insert field references
 * (like {{fieldName}}) into editable text content
 */
export const EditableDivField: React.FC<EditableDivFieldConfig> = ({
  name,
  type,
  label,
  placeholder,
  desc,
  info,
  required,
  readonly,
  customClass,
  isCopyEnable,
  isVisibleEnable,
  dataTestId,
  availableFields = [],
  customHandleChange,
  customFormChange,
  component,
  showCustomError,
  formik: formikProp,
  index,
}) => {
  const { uiLibrary, formik } = useFormContext();
  const { adapter, icons } = uiLibrary;
  const Box = adapter.Box;
  const Popover = adapter.Popover;
  const Paper = adapter.Paper;
  const MenuItem = adapter.MenuItem;
  const Typography = adapter.Typography;
  const IconButton = adapter.IconButton;
  const activeFormik = formikProp || formik;
  const { t } = useTranslation();

  const [showPlaceholder, setShowPlaceholder] = useState<Record<string, boolean>>({});
  const [anchorElEditableDiv, setAnchorElEditableDiv] = useState<HTMLElement | null>(null);
  const [activeSpan, setActiveSpan] = useState<HTMLElement | null>(null);
  const [prevKey, setPrevKey] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const editorRefEditableDiv = useRef<HTMLDivElement>(null);
  const fieldTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isFieldFocusedRef = useRef(false);

  const fieldValue = getFieldValue(activeFormik, name);
  const fieldError = getFieldError(activeFormik, name);
  const fieldTouched = getFieldTouched(activeFormik, name);
  const CopyIcon = icons?.Copy;
  const VisibilityIcon = icons?.Visibility;
  const VisibilityOffIcon = icons?.VisibilityOff;

  const checkPlaceholderVisibility = useCallback((content: string, fieldName: string) => {
    const isEmpty = !content || content.trim() === '' || content === '\u200B';
    setShowPlaceholder((prev) => ({
      ...prev,
      [fieldName]: isEmpty,
    }));
  }, []);

  const setCursorToEnd = useCallback(() => {
    if (editorRefEditableDiv.current) {
      const editor = editorRefEditableDiv.current;
      if (editor.childNodes.length > 0) {
        const range = document.createRange();
        const selection = window.getSelection();
        if (selection) {
          range.selectNodeContents(editor);
          range.collapse(false);
          selection.removeAllRanges();
          selection.addRange(range);
        }
        editor.focus();
      } else {
        editor.focus();
      }
    }
  }, []);

  const setEditorContentWithSpans = useCallback((expression: string, fields: typeof availableFields) => {
    if (!editorRefEditableDiv.current) return;
    const editor = editorRefEditableDiv.current;
    editor.innerHTML = '';
    const parts = expression.split(/(\{\{[^}]+\}\}|\$\{[^}]+\})/);

    parts.forEach((part) => {
      let key: string | null = null;
      if (part.startsWith('{{') && part.endsWith('}}')) {
        key = part.slice(2, -2);
      }

      if (key) {
        const field = fields.find((f) => f.key === key);
        if (field) {
          const span = document.createElement('span');
          span.className = 'field-span';
          span.contentEditable = 'false';
          span.style.cursor = 'pointer';
          span.innerText = `{{${field.key}}}`;
          editor.appendChild(span);
        } else {
          editor.appendChild(document.createTextNode(part));
        }
      } else if (part) {
        editor.appendChild(document.createTextNode(part));
      }
    });
  }, [availableFields]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === '{' && prevKey === '{') {
      e.preventDefault();
      return;
    }

    if (e.key === 'Backspace') {
      const sel = window.getSelection();
      if (sel && sel.rangeCount > 0) {
        const range = sel.getRangeAt(0);
        const { startContainer, startOffset } = range;

        if (
          startContainer.nodeType === Node.TEXT_NODE &&
          startOffset === 0 &&
          startContainer.previousSibling &&
          (startContainer.previousSibling as Element).classList?.contains('field-span')
        ) {
          e.preventDefault();
          const prevSibling = startContainer.previousSibling;
          if (prevSibling.parentNode) {
            prevSibling.parentNode.removeChild(prevSibling);
          }
          return;
        }

        if (
          startContainer.nodeType === Node.ELEMENT_NODE &&
          (startContainer as Element).classList?.contains('field-span')
        ) {
          e.preventDefault();
          if (startContainer.parentNode) {
            startContainer.parentNode.removeChild(startContainer);
          }
        }
      }
    }
  }, [prevKey]);

  const handleKeyUp = useCallback((e: React.KeyboardEvent) => {
    const currentKey = e.key;
    if (currentKey === '{' && prevKey === '{' && !e.defaultPrevented) {
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const { startContainer, startOffset } = range;

        if (startContainer.nodeType === Node.TEXT_NODE) {
          const textContent = startContainer.textContent || '';
          const beforeCursor = textContent.substring(0, startOffset);
          if (beforeCursor.endsWith('{')) {
            if (editorRefEditableDiv.current) {
              setAnchorElEditableDiv(editorRefEditableDiv.current);
            }
          }
        }
      }
    }
    setPrevKey(currentKey);
  }, [prevKey]);

  const handleFieldSelect = useCallback((item: { key: string; label: string }) => {
    if (!editorRefEditableDiv.current) return;

    const newSpan = document.createElement('span');
    newSpan.className = 'field-span';
    newSpan.contentEditable = 'false';
    newSpan.style.cursor = 'pointer';
    newSpan.innerText = `{{${item.key}}}`;

    if (activeSpan) {
      activeSpan.replaceWith(newSpan);
      const spaceNode = document.createTextNode('\u200B');
      newSpan.after(spaceNode);

      if (spaceNode.parentNode) {
        const range = document.createRange();
        range.setStartAfter(spaceNode);
        range.setEndAfter(spaceNode);
        const sel = window.getSelection();
        if (sel) {
          sel.removeAllRanges();
          sel.addRange(range);
        }
      }
      setActiveSpan(null);
    } else {
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        range.deleteContents();
        range.insertNode(newSpan);
        const spaceNode = document.createTextNode('\u200B');
        newSpan.after(spaceNode);

        const newRange = document.createRange();
        newRange.setStartAfter(spaceNode);
        newRange.setEndAfter(spaceNode);
        const sel = window.getSelection();
        if (sel) {
          sel.removeAllRanges();
          sel.addRange(newRange);
        }
      }
    }

    const content = editorRefEditableDiv.current.innerText;
    if (customHandleChange) {
      customHandleChange(
        { target: { name, value: content } } as any,
        'editablediv'
      );
    } else if (customFormChange) {
      customFormChange(
        { target: { name, value: content } } as any,
        'editablediv'
      );
    } else {
      activeFormik.setFieldValue(name, content);
    }

    setAnchorElEditableDiv(null);
    setTimeout(() => {
      setCursorToEnd();
    }, 0);
  }, [activeSpan, name, customHandleChange, customFormChange, activeFormik, setCursorToEnd]);

  useEffect(() => {
    if (editorRefEditableDiv.current && activeFormik.values && !isTyping && availableFields.length > 0) {
      const fieldValue = getNestedProperty(activeFormik.values, name);
      checkPlaceholderVisibility(String(fieldValue || ''), name);
      setTimeout(() => {
        setEditorContentWithSpans(String(fieldValue || ''), availableFields);
      }, 0);
    }
  }, [activeFormik.values, name, isTyping, availableFields, checkPlaceholderVisibility, setEditorContentWithSpans]);

  useEffect(() => {
    return () => {
      if (fieldTimeoutRef.current) {
        clearTimeout(fieldTimeoutRef.current);
      }
    };
  }, []);

  return (
    <FieldWrapper customClass={customClass} index={index}>
      {label && (
        <FieldLabel
          name={name}
          label={label}
          required={required}
          info={info}
        />
      )}
      {desc && <FieldDescription desc={desc} />}
      <div className={`input-group ${isCopyEnable || isVisibleEnable ? '' : 'rounded'}`}>
        <div className="d-flex w-100 flex-wrap">
          <Box className="w-100 d-flex flex-column align-items-start position-relative">
            <Box
              contentEditable={!readonly}
              ref={editorRefEditableDiv}
              id={name}
              onKeyDown={handleKeyDown}
              onKeyUp={handleKeyUp}
              onInput={(event: React.FormEvent<HTMLDivElement>) => {
                const content = (event.target as HTMLElement).innerText;
                setIsTyping(true);
                checkPlaceholderVisibility(content, name);

                if (fieldTimeoutRef.current) {
                  clearTimeout(fieldTimeoutRef.current);
                }

                if (isFieldFocusedRef.current) {
                  fieldTimeoutRef.current = setTimeout(() => {
                    setIsTyping(false);
                  }, 9000);
                }

                if (customHandleChange) {
                  customHandleChange(
                    { target: { name, value: content } } as any,
                    type
                  );
                } else if (customFormChange) {
                  customFormChange(
                    { target: { name, value: content } } as any,
                    type
                  );
                } else {
                  activeFormik.setFieldValue(name, content);
                }
              }}
              onPaste={(e: React.ClipboardEvent<HTMLDivElement>) => {
                e.preventDefault();
                const text = (e.clipboardData || (window as Window & { clipboardData?: DataTransfer }).clipboardData)?.getData('text/plain') || '';
                const selection = window.getSelection();
                if (selection && selection.rangeCount > 0) {
                  const range = selection.getRangeAt(0);
                  range.deleteContents();
                  range.insertNode(document.createTextNode(text));
                  range.collapse(false);
                  selection.removeAllRanges();
                  selection.addRange(range);
                }
                const editor = e.target as HTMLElement;
                const content = editor.innerText;
                checkPlaceholderVisibility(content, name);

                if (availableFields.length > 0) {
                  setTimeout(() => {
                    setEditorContentWithSpans(content, availableFields);
                    setCursorToEnd();
                  }, 0);
                }

                if (customHandleChange) {
                  customHandleChange(
                    { target: { name, value: content } } as any,
                    type
                  );
                } else if (customFormChange) {
                  customFormChange(
                    { target: { name, value: content } } as any,
                    type
                  );
                } else {
                  activeFormik.setFieldValue(name, content);
                }
              }}
              onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                const target = e.target as HTMLElement;
                if (target.classList?.contains('field-span')) {
                  setActiveSpan(target);
                  setAnchorElEditableDiv(target);
                  setIsTyping(true);
                }
              }}
              suppressContentEditableWarning
              data-testid={dataTestId || `${formatString(name)}-editable-div`}
              className={`form-control ${
                isCopyEnable || isVisibleEnable
                  ? 'border border-end-0'
                  : 'rounded'
              } ${fieldError && fieldTouched ? 'border-danger' : ''}`}
              style={{
                borderRadius: '8px',
                border: '1px solid #dee2e6',
                padding: '6px 12px',
                display: 'inline-block',
                flexGrow: 1,
                minHeight: '37px',
              }}
              onFocus={() => {
                isFieldFocusedRef.current = true;
                setIsTyping(true);
                const content = editorRefEditableDiv.current?.innerText || '';
                checkPlaceholderVisibility(content, name);
              }}
              onBlur={(event: React.FocusEvent<HTMLDivElement>) => {
                isFieldFocusedRef.current = false;
                if (fieldTimeoutRef.current) {
                  clearTimeout(fieldTimeoutRef.current);
                  fieldTimeoutRef.current = null;
                }
                const content = (event.target as HTMLElement).innerText;
                checkPlaceholderVisibility(content, name);
                activeFormik.setFieldValue(name, content);
                // Create synthetic event for Formik
                const syntheticEvent = {
                  ...event,
                  target: { name, value: content },
                } as unknown as React.FocusEvent<HTMLInputElement>;
                activeFormik.handleBlur(syntheticEvent);
              }}
              readOnly={readonly || false}
            />
            {showPlaceholder[name] && placeholder && (
              <Box
                sx={{
                  position: 'absolute',
                  top: '8px',
                  left: '12px',
                  color: '#acadaf',
                  pointerEvents: 'none',
                  fontSize: '14px',
                  zIndex: 1,
                }}
              >
                {placeholder}
              </Box>
            )}
          </Box>
          <Popover
            open={Boolean(anchorElEditableDiv)}
            anchorEl={anchorElEditableDiv}
            onClose={() => setAnchorElEditableDiv(null)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            data-testid={`${formatString(name)}-attribute-popover`}
          >
            <Paper
              elevation={3}
              className="attribute-popover"
            >
              <Box
                style={{
                  padding: '12px 16px',
                  backgroundColor: '#f8f9fa',
                  borderBottom: '1px solid #e0e0e0',
                }}
              >
                <Typography variant="subtitle2" color="text.secondary">
                  {t('COMMON:choose_attribute')}
                </Typography>
              </Box>
              {availableFields.map((item) => (
                <MenuItem
                  key={item.key}
                  data-testid={`${formatString(name)}-attribute-${item.key}`}
                  onClick={() => handleFieldSelect(item)}
                  className="d-flex justify-content-between align-items-center"
                >
                  <Typography>{item.label}</Typography>
                  <Typography color="text.secondary" className="text-12">
                    {item.key}
                  </Typography>
                </MenuItem>
              ))}
            </Paper>
          </Popover>
        </div>
        {isVisibleEnable && VisibilityIcon && VisibilityOffIcon && (
          <button
            className={`z-0 btn btn-outline-secondary border-0 rounded-0 border-top border-bottom ${
              !isCopyEnable ? 'border-end rounded-end' : ''
            } ${fieldError && fieldTouched ? 'border-danger' : ''}`}
            type="button"
            data-testid={`${formatString(name)}-visible-btn`}
            onClick={() => {}}
          >
            <IconRenderer Icon={VisibilityIcon} size={16} />
          </button>
        )}
        {isCopyEnable && CopyIcon && (
          <button
            className={`z-0 btn btn-outline-secondary border border-start-0 border-end rounded-end ${
              fieldError && fieldTouched ? 'border-danger' : ''
            }`}
            type="button"
            data-testid={`${formatString(name)}-copy-btn`}
            aria-label="copy"
            onClick={() => {
              if (editorRefEditableDiv.current) {
                const text = editorRefEditableDiv.current.innerText;
                navigator.clipboard.writeText(text);
              }
            }}
          >
            <IconRenderer Icon={CopyIcon} size={16} />
          </button>
        )}
        {component && <div>{component}</div>}
      </div>
      {(showCustomError || (fieldError && fieldTouched)) && (
        <FieldError
          name={name}
          error={fieldError}
          touched={fieldTouched}
          showCustomError={showCustomError}
          dataTestId={dataTestId}
        />
      )}
    </FieldWrapper>
  );
};

