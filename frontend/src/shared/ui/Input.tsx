//InputHTMLAttributes 타입 스크립트 타입  InputHTMLAttributes
//예를 들면 밸류나 플레이스 홀더 같은
import { forwardRef, useState, InputHTMLAttributes } from 'react';

//InputProps라는 타입을 만듬
// InputHTMLAttributes<HTMLInputElement>
// 기본 HTML input이 받을 수 있는 props를 전부 상속받겠다.
//InputHTMLAttributes는 제네릭 타입입니다.
//<HTMLInputElement>는 “이 HTML 속성들은 input 태그 기준이다” 라고 알려주는 부분
//InputHTMLAttributes만 쓰면 “무슨 요소 기준인데?”가 빠져서 타입이 완성되지 않음
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

//컴포넌트 만들기
const Input = forwardRef<HTMLInputElement, InputProps>(
  //프롭스 꺼내기
  (
    {
      label,
      error,
      type = 'text',
      disabled = false,
      required = false,
      //나머지 프롭스 전부 모으기 저거 변수라 rest말고 다른 이름도 가능
      //나머지것들은
      //   rest = {
      //   placeholder: "이메일 입력",
      //   name: "email",
      //   onChange: handleChange
      //   } 이런식으로 들어옴
      ...rest
    },
    ref,
  ) => {
    //딱봐도 비밀번호 보여주는 상태
    const [showPassword, setShowPassword] = useState(false);

    //타입이 비밀번호인지 확인 패스워드가 아니면 false
    const isPassword = type === 'password';

    //비밀번호 타입이고 보여주기 상태이면 타입을 텍스트로 바꾸고 아니면 원래 타입써라
    const inputType = isPassword && showPassword ? 'text' : type;

    return (
      //조건부 렌더링 label && 레이블이 투르면(존재하면) 아래값 보여주기 거짓리며 안보여줌
      <div className="space-y-2">
        {label && (
          <label className="text-base font-semibold text-gray-900">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
          // {required 이게 투르면 *를 표시해 필수 입력 표시
        )}
        <div className="relative">
          <input
            //부모가 넘겨준 ref 연결
            ref={ref}
            //위에서 계산한 인풋타입 넣기
            type={inputType}
            //디저블 트루면 입력창 비활성화
            disabled={disabled}
            className={`w-full h-12 px-4 rounded-xl bg-white border text-gray-900 placeholder:text-gray-400 focus:outline-none disabled:bg-gray-100 transition-colors
              ${
                //에러가 있으면 빨간스타일 없으면 기본 포커스타입
                error
                  ? 'border-red-500 ring-4 ring-red-100 focus:border-red-500 focus:ring-red-100'
                  : 'border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100'
              }
            `}
            //나머지 전부
            {...rest}
          />
          {isPassword && (
            //비밀번호 타입이면 이버튼 보여줄것
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? '숨기기' : '보기'}
            </button>
          )}
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    );
  },
  // {error &&  에러가 있으면 실제 에러 메시지 출력
);

//이건 React DevTools에서 컴포넌트 이름을 잘 보이게 하기 위한 설정.
Input.displayName = 'Input';

export default Input;
