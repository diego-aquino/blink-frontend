'use client';

import { useRef, useState } from 'react';

import { copyToClipboard } from '@/utils/clipboard';
import { cn } from '@/utils/html';

import CheckIcon from '../icons/common/CheckIcon';
import CopyIcon from '../icons/common/CopyIcon';
import { ButtonProps } from './Button';
import IconButton from './IconButton';

const CHECK_ICON_TIMEOUT = 1000;

interface Props extends Omit<ButtonProps, 'children'> {
  text: string;
}

/** Botão que copia um texto para a área de transferência. */
function CopyToClipboardButton({ text, ...rest }: Props) {
  const [showCopiedIcon, setShowCopiedIcon] = useState(false);

  const copiedIconRef = useRef<NodeJS.Timeout | null>(null);

  async function copyText() {
    setShowCopiedIcon(true);

    await copyToClipboard(text);

    if (copiedIconRef.current) {
      clearTimeout(copiedIconRef.current);
    }

    copiedIconRef.current = setTimeout(() => {
      setShowCopiedIcon(false);
      copiedIconRef.current = null;
    }, CHECK_ICON_TIMEOUT);
  }

  return (
    <IconButton variant="secondary" title="Copiar" onClick={copyText} {...rest}>
      <CopyIcon
        className={cn('h-5 w-5 transition-opacity', showCopiedIcon ? 'invisible opacity-0' : 'visible opacity-100')}
      />

      <CheckIcon
        className={cn(
          'absolute inset-0 m-auto h-5 w-5 transition-opacity',
          showCopiedIcon ? 'visible opacity-100' : 'invisible opacity-0',
        )}
      />
    </IconButton>
  );
}

export default CopyToClipboardButton;
