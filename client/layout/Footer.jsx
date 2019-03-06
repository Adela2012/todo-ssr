import className from '../assets/styles/footer.styl'
export default {
  data () {
    return {
      author: 'Adela'
    }
  },
  render () {
    return (
      // <div id="footer">
      <div id={className.footer}>
        Written by {this.author}
      </div>
    )
  }
}