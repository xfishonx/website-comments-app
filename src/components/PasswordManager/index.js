import {Component} from 'react'
import './index.css'
import {v4 as uuidv4} from 'uuid'
import PasswordItem from '../PasswordItem'

class PasswordManager extends Component {
  state = {
    passwordRecord: [],
    inputUrl: '',
    inputName: '',
    inputPassword: '',
    searchInput: '',
    showPassword: false,
  }

  deletePasswordRecord = id => {
    const {passwordRecord} = this.state
    const filteredPasswordRecord = passwordRecord.filter(each => each.id !== id)

    this.setState({passwordRecord: filteredPasswordRecord})
  }

  getSearchRecord = () => {
    const {passwordRecord, searchInput} = this.state

    return passwordRecord.filter(eachDetails =>
      eachDetails.url.toLowerCase().includes(searchInput.toLowerCase()),
    )
  }

  onInputUrlChange = event => {
    this.setState({inputUrl: event.target.value})
  }

  onInputNameChange = event => {
    this.setState({inputName: event.target.value})
  }

  onInputPasswordChange = event => {
    this.setState({inputPassword: event.target.value})
  }

  onInputSearchChange = event => {
    this.setState({searchInput: event.target.value})
  }

  onCheckChange = () => {
    this.setState(prevState => ({showPassword: !prevState.showPassword}))
  }

  addPasswordRecord = event => {
    event.preventDefault()
    const {inputUrl, inputName, inputPassword} = this.state
    const newPasswordRecord = {
      id: uuidv4(),
      url: inputUrl,
      name: inputName,
      password: inputPassword,
    }

    this.setState(prevState => ({
      passwordRecord: [...prevState.passwordRecord, newPasswordRecord],
      inputUrl: '',
      inputName: '',
      inputPassword: '',
    }))
  }

  render() {
    const {showPassword} = this.state
    const searchResult = this.getSearchRecord()

    return (
      <div className="page-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="password-manager-logo"
        />
        <div className="password-manger-containers">
          <div className="user-password-details">
            <div className="user-password-container">
              <form
                className="card-responsive"
                onSubmit={this.addPasswordRecord}
              >
                <h1 className="password-heading">Add New Password</h1>
                <div className="input-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                    alt="website"
                    className="website-icon"
                  />
                  <input
                    type="text"
                    className="input"
                    placeholder="Enter Website"
                    onChange={this.onInputUrlChange}
                  />
                </div>
                <div className="input-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                    alt="username"
                    className="website-icon"
                  />
                  <input
                    type="text"
                    className="input"
                    placeholder="Enter Username"
                    onChange={this.onInputNameChange}
                  />
                </div>
                <div className="input-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                    alt="password"
                    className="website-icon"
                  />
                  <input
                    type="password"
                    className="input"
                    placeholder="Enter Password"
                    onChange={this.onInputPasswordChange}
                  />
                </div>
                <div className="button-container">
                  <button
                    type="submit"
                    className="add-btn"
                    onClick={this.addPasswordRecord}
                  >
                    Add
                  </button>
                </div>
              </form>
            </div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
              alt="password manager"
              className="password-manager-image"
            />
          </div>
        </div>

        <div className="password-maintained-container">
          <div className="user-updated-passwords">
            <div className="user-updated-container">
              <div className="password-details-container">
                <h1 className="password-header">
                  Your Passwords
                  <p className="result-count">{searchResult.length}</p>
                </h1>
                <div className="input-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                    alt="search"
                    className="website-icon"
                  />
                  <input
                    type="search"
                    className="input"
                    placeholder="Search"
                    onChange={this.onInputSearchChange}
                  />
                </div>
              </div>
              <hr className="hr" />
              <div className="checkbox-container">
                <input
                  type="checkbox"
                  className="checkbox-input"
                  id="checkbox"
                  onChange={this.onCheckChange}
                />
                <label htmlFor="checkbox" className="checkbox-label">
                  Show Passwords
                </label>
              </div>
              {searchResult.length !== 0 ? (
                <ul className="password-list-container">
                  {searchResult.map(eachRecord => (
                    <PasswordItem
                      key={eachRecord.id}
                      record={eachRecord}
                      deletePasswordRecord={this.deletePasswordRecord}
                      showPassword={showPassword}
                    />
                  ))}
                </ul>
              ) : (
                <div className="no-password-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                    alt="no passwords"
                    className="no-passwords-image"
                  />
                  <p className="no-passwords-title">No Passwords</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default PasswordManager
