import { Outlet, Link} from 'react-router-dom'
import {Fragment, useState} from 'react'
import {ReactComponent as CrownLogo} from '../../assets/crown.svg'
import {NavigationContainer, NavLink, LogoContainer , NavLinks} from  './navigation.styles'
import {useSelector} from 'react-redux'
import CartIcon from '../../components/cart-icon/cart-icon.component'

import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component'


import {selectIsCartOpen} from '../../store/cart/cart.selector'
import { selectCurrentUser } from '../../store/user/user.selector'
import {signOutUser} from '../../utils/firebase/firebase.utils'

const Navigation = () => {

  const currentUser = useSelector(selectCurrentUser)
  
  const isCartOpen = useSelector(selectIsCartOpen)

  

    return(
      <Fragment>
        <NavigationContainer>
            <LogoContainer to="/" >

                <CrownLogo className="logo"/>
            </LogoContainer>
          <NavLinks >
            <NavLink  to="shop">
                Shop
            </NavLink>
            {currentUser ? (<NavLink as="span" onClick={signOutUser}>SIGN OUT</NavLink> ) :(<NavLink   to="auth">
                SIGN IN
            </NavLink>)}
            <CartIcon />
          </NavLinks>
          {isCartOpen && <CartDropdown/>}
        </NavigationContainer>
        <Outlet/>
      </Fragment>
    )
  }
  

  export default Navigation