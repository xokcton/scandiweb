import React, { Component } from 'react'

class Attributes extends Component {
  render() {
    return (
      <>
        {
          this.props.allAttributes.map((element, index) => (
            <div key={index} className="attr_cart_header">
              <p>{ element.id }:</p>
              {
                element.id === 'Color' ? (
                  <div className='color' key={element.id}>
                    {
                      element.items.map((item, idx) => (
                        <div 
                          key={item.id} 
                          style={{ backgroundColor: `${item.value}` }}
                          className={`${this.props.selectedAttributes[element.id.toLowerCase()] === idx ? 'active' : ''}`} 
                        />
                      ))
                    }
                  </div>
                ) : (
                  <div className='general'>
                    {
                      element.items.map((item, idx) => (
                        <div 
                          className={`${this.props.selectedAttributes[element.id.toLowerCase()] === idx ? 'active' : ''}`} 
                          key={item.id}  
                        >
                          { item.value }
                        </div>
                      ))
                    }
                  </div>
                )
              }
            </div>
          ))
        }
      </>
    )
  }
}

export default Attributes
