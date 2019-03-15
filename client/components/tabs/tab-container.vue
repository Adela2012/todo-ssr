<script>
export default {
  props: {
    panes: {
      type: Array,
      required: true
    }
  },
  render () {
    const contents = this.panes.map(i => {return i.active ? i.$slots.default: null})
    return (
      <div class="tab-content">
        {contents}
      </div>
    )
  }
}
</script>
