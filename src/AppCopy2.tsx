import { ChangeEvent } from 'react';
import { RecoilRoot, atom, selector, useRecoilState, useRecoilValue } from 'recoil';

const textState = atom({
  key: 'textState',
  default: '',
});

const charCountState = selector({
  key: 'charCountState',
  get: ({ get }) => {
    const text = get(textState);
    return text.length;
  },
});

const TextInput = () => {
  const [text, setText] = useRecoilState(textState);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const count = useRecoilValue(charCountState);

  return (
    <div>
      <input type="text" value={text} onChange={onChange} />
      <br />
      Echo: {text}
      <br />
      Character Count: {count}
    </div>
  );
}

const App = () => {
  return (
    <RecoilRoot>
      <TextInput />
    </RecoilRoot>
  );
}

export default App;
