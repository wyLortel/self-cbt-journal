import { useNavigate } from 'react-router-dom'
import LoginForm from '@features/auth/ui/LoginForm'

export default function LoginPage() {
  const navigate = useNavigate()

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        backgroundImage: 'url(/images/self_log_background.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* 어두운 오버레이 */}
      <div className="absolute inset-0 bg-black/10"></div>

      {/* 카드 */}
      <div className="relative z-10 w-full max-w-md">
        <div className="space-y-4">
          {/* 로고 */}
          <div className="text-center mb-8">
            <div className="text-indigo-600 text-3xl font-bold mb-2">🌿</div>
            <h1 className="text-2xl font-bold text-gray-900">Self Mental</h1>
          </div>

          <LoginForm
            onSuccess={() => {
              alert('로그인 성공!')
              navigate('/dashboard')
            }}
          />
        </div>
      </div>
    </div>
  )
}
