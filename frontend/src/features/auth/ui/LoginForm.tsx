import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Button from '@shared/ui/Button'
import Input from '@shared/ui/Input'
import Card from '@shared/ui/Card'
import { LoginSchema, LoginFormData } from '../lib/validation'
import { useAuth } from '../api/useAuth'

interface LoginFormProps {
  onSuccess?: () => void
}

export default function LoginForm({ onSuccess }: LoginFormProps) {
  const navigate = useNavigate()
  const { login, loading, error: apiError } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
    mode: 'onChange',
  })

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data)
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
            다시 돌아오신 걸 환영해요.
          </h2>
          <p className="text-sm text-gray-700">
            이메일과 비밀번호로 로그인하세요.
          </p>
        </div>

        {/* OAuth 버튼 */}
        <div className="space-y-3">
          <Button variant="secondary" fullWidth disabled>
            <svg className="w-5 h-5 mr-2 inline" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Google로 시작하기
          </Button>
          <Button variant="secondary" fullWidth disabled>
            <svg className="w-5 h-5 mr-2 inline" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.002 12.002 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            GitHub로 시작하기
          </Button>
        </div>

        {/* 또는 구분선 */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">또는</span>
          </div>
        </div>

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
            placeholder="8자 이상"
            error={errors.password?.message}
            required
            {...register('password')}
          />

          <Button type="submit" fullWidth disabled={isSubmitting || loading}>
            {isSubmitting || loading ? '로그인 중...' : '로그인'}
          </Button>
        </form>

        {/* 푸터 링크 */}
        <div className="flex items-center justify-center gap-2 text-sm">
          <button className="text-indigo-600 hover:underline">
            비밀번호를 잊으셨나요?
          </button>
          <span className="text-gray-300">|</span>
          <button
            type="button"
            onClick={() => navigate('/signup')}
            className="text-indigo-600 hover:underline"
          >
            회원가입
          </button>
        </div>
      </div>
    </Card>
  )
}
