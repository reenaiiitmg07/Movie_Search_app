import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {connect} from 'react-redux';
import {getMovieData,getTermMovieData} from './actions/index';

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      data: [],
      page: 1,
      term: '',
      years:[]
    }
    this.loadMore=this.loadMore.bind(this);
    this.showYear=this.showYear.bind(this);
  }
  componentDidMount() {
    this.props.getMovieData(1);
}
showYear(e){
      let year = new Set();
      //console.log(this.props.data);
      this.props.data.map((item)=>{
       console.log(item.Year);
       year.add(item.Year);
      })

     this.setState({years:year});
     console.log(this.state.years);
}
loadMore(e) {
    let term = this.state.term;
    let page=this.state.page;
    page=page+1;
    if(term){
      this.props.getTermMovieData(term,page)
    }
    else{
      this.props.getMovieData(this.state.page);
    }
    this.setState({page});


  }

  render() {
    let Movie=this.props.data;
    console.log(Movie);
    return (
      <div className="App">
          <div className="row search-bar" style={{ textAlign: 'center', padding: '10px' }}> <input/></div>
          <div className="row">
             <div className="col-sm-4">
                <div className="row" style={{ textAlign: 'center' }}><button onClick={this.showYear} className="btn btn-primary">Show Filter</button></div>
                 <ul>
                {this.state.years?this.state.years.map((item)=>{
                  return(
                    <li>
                       <button onClick={this.selectedMovie} className="btn btn-primary">{item}</button>
                    </li>
                  )

                }):null}
                </ul>
            </div>
            <div className="col-sm-8">
               <ul className="list list-inline list-unstyled responsive" style={{ padding: '10px' }}>
                 {this.props.data?this.props.data.map((item)=>{
                  return (
                       <li style={{ border: '1px solid #80808038' }}>
                       <div className="card" style={{width:'200px',height:'300px'}}>
                       <img src={item.Poster} className="card-img-top img-thumbnail"style={{width:'200px',height:'150px'}} />
                       <div class="card-body">
                       <p style={{ textAlign: 'center', padding: '10px' }}className="card-title">Title:{item.Title}</p>
                       <p style={{ textAlign: 'center', padding: '10px',wordWrap:'break-word',width:'200px'}}>Year:{item.Year}</p>
                      </div>
                      </div>
                     </li>
                    )
                }):null}
             </ul>
              </div>
            </div>
     <div className="row" style={{ textAlign: 'center' }}><button onClick={this.loadMore} className="btn btn-primary">load more</button></div>
</div>
    );
  }
}

function mapStateToProps(state){
  return{
    data:state.data.Search
  }

}
export default connect(mapStateToProps,{getMovieData,getTermMovieData})(App);
