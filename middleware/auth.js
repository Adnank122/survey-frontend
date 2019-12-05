export default function auth({ store, redirect }) {
  if (!store.state.user) {
    redirect('/')
  }
}
