import React from 'react'
import ReactDOM from 'react-dom'

import './styles.css'
import logo from './images/logo.png'

import Loader from './components/Loader'

function CharacterCard(props) {
  const { character } = props

  return (
    <div
      className='CharacterCard'
      style={{ backgroundImage: `url(${character.image})` }}
    >
      <div
        title={character.name}
        className='CharacterCard__name-container text-truncate'
      >
        {character.name}

        {/* <div>{character.origin.name}</div> */}
      </div>
    </div>
  )
}

class App extends React.Component {
  state = {
    nextPage: 1,
    error: null,
    loading: true,
    data: {
      results: [],
    },
  }
  componentDidMount() {
    this.fetchCaracters()
  }
  fetchCaracters = async () => {
    this.setState({ loading: true, error: null })

    try {
      const response = await fetch(
        `https://rickandmortyapi.com/api/character?page=${this.state.nextPage}`
      )
      const data = await response.json()

      this.setState({
        data: {
          info: data,
          results: [].concat(this.state.data.results, data.results),
        },
        loading: false,
        nextPage: this.state.nextPage + 1,
      })
    } catch (error) {
      this.setState({ loading: false, error: error })
    }
  }

  render() {
    if (this.state.error) {
      return 'Error ' + this.state.error.message
    }
    return (
      <div className='container'>
        <div className='App'>
          <img className='Logo' src={logo} alt='Rick y Mortys' />

          <ul className='row'>
            {this.state.data.results.map(character => (
              <li className='col-6 col-md-3' key={character.id}>
                <CharacterCard character={character} />
              </li>
            ))}
          </ul>

          {this.state.loading && (
            <div className='loader'>
              <Loader />
            </div>
          )}

          {!this.state.loading && (
            <button onClick={() => this.fetchCaracters()}>Load More</button>
          )}
        </div>
      </div>
    )
  }
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
