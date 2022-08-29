import styled from "styled-components";
import InputBox from "./InputBox";
import Button from "./Button";

const StyeldForm = styled.form`
  background-color: white;
  width: 80%;
  min-height: 40%;
  border-radius: 1rem;

  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .inputs {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin-bottom: 1rem;
    label {
      display: flex;
      justify-content: space-around;
      align-items: center;
      position: relative;
      margin-bottom: 2rem;
    }
    input {
      height: 2.5rem;
      font-size: 1.2rem;
      margin-left: 1rem;
    }
    p {
      position: absolute;
      right: 1rem;
      top: 0;
      transform: translate(0, -100%);
      padding: 0.2rem 0.4rem;
      color: red;
      font-size: 0.8rem;
      display: block;
    }
  }
  button {
    width: 100px;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    &:nth-child(2) {
      margin-bottom: 0.5rem;
    }
  }
`;

const onInputChange = (e, input) => {
  input.setValueFn(e.target.value);
  if (!input.confirmIsValid) return;
  input.confirmIsValid();
};

const Form = ({ className, inputs, buttons }) => {
  return (
    <StyeldForm className={className}>
      <div className="inputs">
        {inputs.map((input, idx) => (
          <label key={idx}>
            {input.label}
            <InputBox
              type={input.type}
              ref={input.ref}
              onChange={(e) => onInputChange(e, input)}
            />
            {input.isValid ? null : <p>{input.msg}</p>}
          </label>
        ))}
      </div>
      {buttons.map((button, idx) => (
        <Button key={idx} onClick={button.onClick} disabled={button.disabled}>
          {button.value}
        </Button>
      ))}
    </StyeldForm>
  );
};

export default Form;
//
