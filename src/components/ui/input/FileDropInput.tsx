"use client";

import React, { DragEvent, KeyboardEvent, useId, useRef, useState } from 'react';
import UploadIcon from '@/components/ui/icon/icons/Upload';
import { Icon } from '../icon';
import { clsx } from '@/utils';
import { InputProps } from './input.types';
import styles from './input.module.scss';

export const FileDropInput = ({
  className = '',
  name,
  label,
  error = false,
  size = 'md',
  variant = 'default',
  disabled = false,
  readOnly = false,
  fullWidth = false,
  containerStyle,
  cssVars,
  multiple,
  onChange,
  dropText = 'Drop files here or click to upload',
  helperText,
  ...props
}: InputProps) => {
  const uniqueId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const errorId = typeof error === 'string' ? `${uniqueId}-error` : undefined;
  const isInteractive = !disabled && !readOnly;
  const resolvedVariant = variant === 'floating' ? 'default' : variant;
  const resolvedContainerStyle = {
    ...(containerStyle ?? {}),
    ...((cssVars ?? {}) as React.CSSProperties),
  };

  const syncFiles = (files: FileList | null) => {
    const names = files ? Array.from(files).map((file) => file.name) : [];
    setSelectedFiles(names);
  };

  const handleNativeInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    syncFiles(event.target.files);
    onChange?.(event);
  };

  const assignDroppedFiles = (files: FileList) => {
    if (!inputRef.current) return;

    const dataTransfer = new DataTransfer();
    Array.from(files).forEach((file) => dataTransfer.items.add(file));
    inputRef.current.files = dataTransfer.files;

    syncFiles(inputRef.current.files);
    onChange?.({
      target: inputRef.current,
      currentTarget: inputRef.current,
    } as React.ChangeEvent<HTMLInputElement>);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (!isInteractive) return;

    setIsDragOver(false);
    if (event.dataTransfer.files?.length) {
      assignDroppedFiles(event.dataTransfer.files);
    }
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (isInteractive) {
      setIsDragOver(true);
    }
  };

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(false);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!isInteractive) return;

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      inputRef.current?.click();
    }
  };

  return (
    <div
      className={clsx(
        styles.container,
        styles[size],
        styles[resolvedVariant],
        error ? styles.error : '',
        fullWidth ? styles.fullWidth : '',
        disabled ? styles.disabled : '',
        className
      )}
      style={resolvedContainerStyle}
    >
      {label && (
        <label htmlFor={uniqueId} className={styles.label}>
          {label}
        </label>
      )}

      <input
        id={uniqueId}
        ref={inputRef}
        type="file"
        name={name}
        multiple={multiple}
        onChange={handleNativeInputChange}
        disabled={disabled}
        className={styles.fileNativeInput}
        aria-invalid={!!error}
        aria-describedby={errorId}
        {...props}
      />

      <div
        className={clsx(
          styles.fileDropZone,
          isDragOver && styles.fileDropZoneActive,
          !isInteractive && styles.fileDropZoneDisabled
        )}
        role="button"
        tabIndex={isInteractive ? 0 : -1}
        aria-disabled={!isInteractive}
        onClick={() => isInteractive && inputRef.current?.click()}
        onKeyDown={handleKeyDown}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <Icon icon={UploadIcon} size={20} decorative className={styles.fileDropIcon} />
        <span className={styles.fileDropText}>{dropText}</span>
        {helperText && <span className={styles.fileDropHint}>{helperText}</span>}
      </div>

      {selectedFiles.length > 0 && (
        <div className={styles.fileDropFiles}>
          {selectedFiles.map((fileName, index) => (
            <span key={`${fileName}-${index}`} className={styles.fileDropFile}>
              {fileName}
            </span>
          ))}
        </div>
      )}

      {typeof error === 'string' && (
        <span id={errorId} className={styles.errorMessage} role="alert" aria-live="polite">
          {error}
        </span>
      )}
    </div>
  );
};
