import React from 'react';

interface InputOneTimeCodeProps {
  codeLength: number;
}

export default function InputOneTimeCode(props: InputOneTimeCodeProps) {
  const { codeLength } = props;

  const [code, setCode] = React.useState(
    Array.from({ length: codeLength }, (e, i) => '')
  );

  const inputRefs = React.useRef(
    code.map(() => React.createRef<HTMLInputElement>())
  );

  const handleFocus = (i: number) => {
    setCode((prevCode) => {
      const tempCode = [...prevCode];
      tempCode[i] = '';
      return tempCode;
    });
  }

  const handleKeyUp = (key: string, i: number) => {
    if (key === 'Backspace' || key === 'Delete') {
      const tempCode = [...code];
      tempCode[i - 1] = '';
      setCode(tempCode);
      inputRefs.current?.[i - 1]?.current?.focus();
    }
  }

  const handleChange = (char: string, i: number) => {
    const isValidChar = true;
    if (isValidChar) {
      const tempCode = [...code];
      tempCode.splice(i, 1, char);
      setCode(tempCode);
    }
    if (isValidChar && i < codeLength - 1) {
      inputRefs.current?.[i + 1]?.current?.focus();
    } else if (isValidChar) {
      inputRefs.current?.[i]?.current?.blur();
    }
  }

  const handlePaste = (clipboardData: any) => {
    const tempCode = clipboardData.getData('Text').split('')
    setCode(tempCode);
  }

  return (
    <div>
      {inputRefs.current.map((item, i) => {
        return (
          <input
            key={i}
            className={'input-otc'}
            onPaste={(e) => {
              handlePaste(e.clipboardData);
              e.stopPropagation();
              item.current?.blur();
            }}
            ref={inputRefs.current[i]}
            tabIndex={i}
            onFocus={(e) => handleFocus(i)}
            onKeyUp={(e) => handleKeyUp(e.key, i)}
            onChange={(e) => handleChange(e.target.value, i)}
            value={code[i]}
          />
        );
      })}
    </div>
  );
}
