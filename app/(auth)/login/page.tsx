import { Login } from '@/components/auth/login'
// import { BackButton } from '@/components/ui/back-button'

export default function AdminLoginPage() {
    return (
        <div className="p-6 flex items-center justify-center container min-w-screen-sm mx-auto">
            {/* <div className='absolute top-10 left-10'>
        <BackButton />
      </div> */}

            <section className="form-section w-1/2 p-32">
                <Login />
            </section>
        </div>
    )
}
