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
      margin-bottom: 1rem;
    }
    input {
      height: 2.5rem;
      font-size: 1rem;
      margin-left: 1rem;
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

const Form = ({ className, inputs, buttons }) => {
  return (
    <StyeldForm className={className}>
      <div className="inputs">
        {inputs.map((input, idx) => (
          <label key={idx}>
            {input.label}
            <InputBox onChange={(e) => input.setStateFn(e.target.value)} />
          </label>
        ))}
      </div>
      {buttons.map((button, idx) => (
        <Button key={idx} onClick={button.onClick}>
          {button.value}
        </Button>
      ))}
    </StyeldForm>
  );
};

export default Form;
//
