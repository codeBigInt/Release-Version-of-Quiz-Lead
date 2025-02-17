import React from 'react'

const Header = () => {
  
  const [menuDisplayed, setMenuDisplayed] = useState(false)
  const ctx = useContext(storeAgent)
  const menuToggler = () => {
    menuDisplayed === false ? setMenuDisplayed(true) : setMenuDisplayed(false)
    
}

  return (
    <main className='bg-white w-screen h-screen overflow-x-hidden'>
        <header className='fixed lg:w-[100%] z-40 shadow-sm'>
            <Nav menuDisplayed = {menuDisplayed} menuToggler = {menuToggler} />
        </header>
        <div className='relative'>
              { menuDisplayed && <DropDown menuToggler = {menuToggler} /> }
              { menuDisplayed && <Overlay menuToggler = { menuToggler} /> }
              { ctx.showCalculator && <Calculator /> }
        </div>
        <section className= 'mt-[40px] file:overflow-x-hidden w-screen h-screen pt-8 bg-[#f0f0ff]'>
            <Outlet />
        </section>
    </main>
  )
}

export default Header
