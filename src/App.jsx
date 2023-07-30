import { redirect } from 'react-router-dom';
import Nav from './components/Nav';
import Footer from './components/siteInfo/Footer';

export async function navAction({request}) {
  const data = await request.formData();
  const { semester, branch } = Object.fromEntries(data);
  return redirect(`search/${semester}/${branch}`);
}

function App() {

  return (
    <div className="body">
      <Nav type={null} />
      <Footer />
    </div>
  )
}

export default App
