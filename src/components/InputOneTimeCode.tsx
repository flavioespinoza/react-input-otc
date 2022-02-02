import React from 'react';

interface InputOneTimeCodeProps {
  codeLength: number
}

export default function InputOneTimeCode(props: InputOneTimeCodeProps) {  
  const { codeLength } = props;
  const [code, setCode] = React.useState<string[]>(
    Array.from({ length: codeLength }, (e, i) => "")
  ); // ["", "", "", ""]
  const inputRefs = React.useRef(code.map(() => React.createRef<HTMLInputElement>()));

  const handleKeyDown = React.useCallback((keyCode: number, i: number) => {

    // switch

    // backspace

    // delete

    // arrow left

    // arrow right

    // default

  }, []);

  const handlePaste = React.useCallback((clipboardData: any) => {
    setCode(clipboardData.getData('Text').split(''));
  }, []);

  const inputs = inputRefs.current.map((item, i) => {
    return (
      <input
        key={i}
        onPaste={(e) => {
          handlePaste(e.clipboardData);
          e.stopPropagation();
          item.current?.blur();
        }}
        ref={inputRefs.current[i]}
        tabIndex={i}


      />
    );
  });

  return (
    <div>
      <span className={'flex-span'}>{inputs}</span>
    </div>
  );
}
