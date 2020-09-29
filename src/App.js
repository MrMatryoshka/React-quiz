import React, {Component} from 'react'
import Layout from './hoc/Layout/Layout'
import {Redirect, Route, Router, Switch,withRouter} from 'react-router-dom'
import Quiz from './containers/Quiz/Quiz'
import QuizList from './containers/QuizList/QuizList'
import Auth from './containers/Auth/Auth'
import QuizCreator from './containers/QuizCreator/QuizCreator'
import {connect} from "react-redux";
import Logout from "./components/Logout/logout";
import {autoLogin} from "./store/actions/auth";

class App extends Component {

    componentDidMount() {
        this.props.autoLogin()
    }

    render() {
    let routs= (
        <Switch>
          <Route path="/auth" component={Auth} />
          <Route path="/quiz/:id" component={Quiz} />
          <Route path="/" exact component={QuizList} />
          <Redirect to={'/'}/>
        </Switch>
    );
    if (this.props.isAuthenticated){
        routs =(
            <Switch>
                <Route path="/quiz-creator" component={QuizCreator} />
                <Route path="/quiz/:id" component={Quiz} />
                <Router path='logout' component ={Logout }/>
                <Route path="/" exact component={QuizList} />
                <Redirect to={'/'}/>
            </Switch>
        )
    }
    return (
      <Layout>
        {routs}
      </Layout>
    )
  }
}

function mapStateToProps(state) {
  return{
  isAuthenticated : !!state.auth.token
  }
}

function mapDispatchToProps(dispatch) {
    return{
        autoLogin : () => dispatch(autoLogin())
    }
}
export default withRouter(connect (mapStateToProps,mapDispatchToProps) (App))
