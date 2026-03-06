'use client';

import Link from 'next/link';
import { Icon } from '@/components/ui/icon';
import LoaderIcon from '@/components/ui/icon/icons/Loader';
import { clsx } from '@/utils';
import { ButtonAsButtonProps, ButtonAsLinkProps, ButtonProps } from './button.types';
import styles from './button.module.scss';

function isExternalHref(href: string) {
  return /^([a-z]+:)?\/\//i.test(href) || href.startsWith('mailto:') || href.startsWith('tel:');
}

function ButtonContent({
  children,
  leftIcon,
  rightIcon,
  loading,
  loadingText,
  iconOnly,
}: Pick<ButtonProps, 'children' | 'leftIcon' | 'rightIcon' | 'loading' | 'loadingText' | 'iconOnly'>) {
  if (iconOnly) {
    return loading ? <Icon icon={LoaderIcon} className={styles.spinner} decorative /> : <>{leftIcon || children}</>;
  }

  return (
    <>
      {loading ? <Icon icon={LoaderIcon} className={styles.spinner} decorative /> : leftIcon ? <span className={styles.icon}>{leftIcon}</span> : null}
      <span className={styles.label}>{loading && loadingText ? loadingText : children}</span>
      {!loading && rightIcon ? <span className={styles.icon}>{rightIcon}</span> : null}
    </>
  );
}

export function Button(props: ButtonProps) {
  const {
    className,
    children,
    variant = 'solid',
    size = 'md',
    color = 'primary',
    fullWidth = false,
    iconOnly = false,
    leftIcon,
    rightIcon,
    loading = false,
    loadingText,
  } = props;

  const rootClassName = clsx(
    styles.root,
    styles[variant],
    styles[size],
    styles[color],
    fullWidth && styles.fullWidth,
    iconOnly && styles.iconOnly,
    loading && styles.loading,
    className,
  );

  if ('href' in props && typeof props.href === 'string') {
    const {
      href,
      external,
      prefetch,
      target,
      rel,
      onClick,
      className,
      children,
      variant = 'solid',
      size = 'md',
      color = 'primary',
      fullWidth = false,
      iconOnly = false,
      leftIcon,
      rightIcon,
      loading = false,
      loadingText,
      ...rest
    } = props as ButtonAsLinkProps;

    const disabled = Boolean((props as ButtonAsLinkProps)['aria-disabled']) || false;
    const isExternal = external ?? isExternalHref(href);

    const handleClick: React.MouseEventHandler<HTMLAnchorElement> = (event) => {
      if (disabled || loading) {
        event.preventDefault();
        return;
      }
      onClick?.(event);
    };

    if (isExternal) {
      return (
        <a
          {...rest}
          href={href}
          className={clsx(rootClassName, (disabled || loading) && styles.disabled)}
          target={target ?? '_blank'}
          rel={rel ?? 'noopener noreferrer'}
          aria-disabled={disabled || loading}
          onClick={handleClick}
          tabIndex={disabled || loading ? -1 : rest.tabIndex}
        >
          <ButtonContent
            children={children}
            leftIcon={leftIcon}
            rightIcon={rightIcon}
            loading={loading}
            loadingText={loadingText}
            iconOnly={iconOnly}
          />
        </a>
      );
    }

    return (
      <Link
        {...rest}
        href={href}
        prefetch={prefetch}
        className={clsx(rootClassName, (disabled || loading) && styles.disabled)}
        aria-disabled={disabled || loading}
        onClick={handleClick}
        tabIndex={disabled || loading ? -1 : rest.tabIndex}
      >
        <ButtonContent
          children={children}
          leftIcon={leftIcon}
          rightIcon={rightIcon}
          loading={loading}
          loadingText={loadingText}
          iconOnly={iconOnly}
        />
      </Link>
    );
  }

  const {
    type = 'button',
    disabled,
    className: _className,
    children: _children,
    variant: _variant = 'solid',
    size: _size = 'md',
    color: _color = 'primary',
    fullWidth: _fullWidth = false,
    iconOnly: _iconOnly = false,
    leftIcon: _leftIcon,
    rightIcon: _rightIcon,
    loading: _loading = false,
    loadingText: _loadingText,
    ...rest
  } = props as ButtonAsButtonProps;

  return (
    <button
      {...rest}
      type={type}
      className={rootClassName}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
    >
      <ButtonContent
        children={children}
        leftIcon={leftIcon}
        rightIcon={rightIcon}
        loading={loading}
        loadingText={loadingText}
        iconOnly={iconOnly}
      />
    </button>
  );
}
