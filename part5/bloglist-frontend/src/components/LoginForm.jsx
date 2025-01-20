const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
}) => {
  return (
    <>
      <h3>Login</h3>
      <form onSubmit={handleSubmit}>
        <section>
          <label>
            Username
            <div>
              <input
                type="text"
                value={username}
                name="username"
                id="username"
                onChange={handleUsernameChange}
              />
            </div>
          </label>

          <label>
            Password
            <div>
              <input
                type="password"
                value={password}
                name="password"
                id="password"
                onChange={handlePasswordChange}
              />
            </div>
          </label>
          <button type="submit">Login</button>
        </section>
      </form>
    </>
  )
}

export default LoginForm
