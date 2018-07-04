import React from 'react';
import { Main, Header, Footer, Nav, Section, VMContext } from 'dotnetify-elements';

class App extends React.Component {
   render() {
      return (
         <VMContext vm="App">
            <Main>
               <Header />
               <Nav />
               <Section />
               <Footer />
            </Main>
         </VMContext>
      );
   }
}

export default App;
