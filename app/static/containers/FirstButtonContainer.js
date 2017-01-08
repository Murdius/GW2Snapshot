import {connect} from 'react-redux'
import {takeSnapshot} from '../actions'
import FirstButton from '../components/firstButton.jsx'

const mapStateToProps = (state, ownProps) => ({apiKey: state.apiKey})

const mapDispatchToProps = (dispatch, ownProps) => ({
    onClick: (apiKey) => {
        dispatch(takeSnapshot(apiKey))
    }
})

const FirstButtonContainer = connect(mapStateToProps, mapDispatchToProps)(FirstButton)

export default FirstButtonContainer
