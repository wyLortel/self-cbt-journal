import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Button from '@shared/ui/Button'
import Input from '@shared/ui/Input'
import Card from '@shared/ui/Card'
import { SignupSchema, SignupFormData } from '../lib/validation'
import { useAuth } from '../api/useAuth'

interface SignupFormProps {
  onSuccess?: () => void
}

export default function SignupForm({ onSuccess }: SignupFormProps) {
  const navigate = useNavigate()
  const { signup, loading, error: apiError } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(SignupSchema),
    mode: 'onChange',
  })

  const onSubmit = async (data: SignupFormData) => {
    try {
      await signup(data)
      onSuccess?.()
    } catch {
      // 에러는 apiError에서 처리됨
    }
  }

  return (
    <Card className="w-full max-w-md">
      <div className="space-y-6">
        {/* 헤더 */}
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-1">
            처음 오셨군요.
          </h2>
          <p className="text-sm text-gray-700">
            Self Mental은 당신의 감정 여정을 함께합니다.
          </p>
        </div>

        {/* 안내 카드 */}
        <Card variant="info">
          <div className="space-y-2">
            <h4 className="font-semibold text-sm">Self Mental 이용약관</h4>
            <p className="text-xs leading-relaxed">
              가입함으로써, 당신은 Self Mental의 <a href="#" className="underline">개인정보보호정책</a>과 <a href="#" className="underline">이용약관</a>에 동의합니다.
            </p>
          </div>
        </Card>

        {/* 폼 */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {apiError && (
            <Card variant="error">
              <p className="text-sm">{apiError}</p>
            </Card>
          )}

          <Input
            label="이메일"
            type="email"
            placeholder="you@example.com"
            error={errors.email?.message}
            required
            {...register('email')}
          />

          <Input
            label="비밀번호"
            type="password"
            placeholder="최소 8자, 대문자 포함"
            error={errors.password?.message}
            required
            {...register('password')}
          />

          <Input
            label="비밀번호 확인"
            type="password"
            placeholder="비밀번호 다시 입력하세요"
            error={errors.passwordConfirm?.message}
            required
            {...register('passwordConfirm')}
          />

          <Button type="submit" fullWidth disabled={isSubmitting || loading}>
            {isSubmitting || loading ? '가입 중...' : '회원가입'}
          </Button>
        </form>

        {/* 로그인 링크 */}
        <div className="text-center text-sm">
          <span className="text-gray-700">이미 계정이 있나요? </span>
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="text-indigo-600 font-semibold hover:underline"
          >
            로그인
          </button>
        </div>
      </div>
    </Card>
  )
}
