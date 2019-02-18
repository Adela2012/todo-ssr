import className from '../assets/styles/footer.styl'
export default {
  data () {
    return {
      author: 'Adela'
    }
  },
  render () {
    return (
      <div class={className.footer} id="footer">Written by {this.author}</div>
    )
  }
}