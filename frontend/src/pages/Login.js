import { useState } from "react"
import { useLogin } from "../hooks/useLogin"

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {login, error, isLoading} = useLogin()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await login(email, password)
  }

  return (
    <>
    <div className="login">
        <div class="container">

          <section class="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
            <div class="container">
              <div class="row justify-content-center">
                <div class="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">

                  
                  <div class="card mb-3">

                    <div class="card-body">

                      <div class="pt-4 pb-2">
                        <h5 class="card-title text-center pb-0 fs-4">Login to Your Account</h5>
                        <p class="text-center small">Enter your username & password to login</p>
                      </div>

                      <form class="row g-3 needs-validation" className="login" onSubmit={handleSubmit}>

                        <div class="col-12">
                          <label htmlFor="yourUsername" class="form-label">Username</label>
                          <div class="input-group has-validation">
                            <span class="input-group-text" id="inputGroupPrepend">@</span>
                            
                            <input
                                  type="email"
                                  onChange={(e) => setEmail(e.target.value)}
                                  value={email} 
                                  class="form-control" id="yourUsername"
                                  autoComplete="off"
                                  />
                              <div class="invalid-feedback">Please enter your username.</div>
                          </div>
                        </div>

                        <div class="col-12">
                          <label htmlFor="yourPassword" class="form-label">Password</label>
        
                            <div class="invalid-feedback">Please enter your password!</div>
                            <input
                                    type="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password} 
                                    class="form-control" id="yourPassword"/>
                       </div>
                       <div class="col-12">
                    <br />
                    </div>
                        
                        <div class="col-12">
                          <button disabled={isLoading}  class="btn btn-primary w-100">Log in</button>
                          {error &&  
                              <div disabled={isLoading} >{error}</div> 
                          }
                        </div>
                        
                        
                      </form>

                    </div>
                  </div>


                </div>
              </div>
            </div>

          </section>

        </div>
      </div></>
  )
}

export default Login