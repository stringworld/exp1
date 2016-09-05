// import Reflux from 'reflux';

//INCREMENT +  DECREMENT -
// export default Reflux.createActions(['INCREMENT', 'DECREMENT']);

const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

module.export = {
    add(test) {
        return {
            type: INCREMENT,
            text
        }
    },
    decre(text) {
        return {
            type: DECREMENT,
            text
        }
    }
}