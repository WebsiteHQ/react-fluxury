import { Component } from 'react';

export var connectToStore = (store, ComposedComponent, getState) => class extends Component {

  componentDidMount() {
    this.eventSubscription = store.addListener( this.handleStoreChange )
  }

  componentWillUnmount() {
    if (this.eventSubscription && typeof this.eventSubscription === 'function') {
      this.eventSubscription.remove()
    } else {
      console.log( 'eventSubscription is unexpected type.' )
    }
  }

  handleStoreChange() {
    if (store && typeof store.getState === 'function') {
      this.setState(
        store.getState()
      )
    }
  }

  render() {
    return <ComposedComponent {...this.props} {...this.state} />;
  }
};