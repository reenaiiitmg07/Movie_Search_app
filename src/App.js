import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {connect} from 'react-redux';
import {getMovieData} from './actions/index';

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      data: [],
      page: 1,
      years:[],
      movies:[]
    }
    this.loadMore=this.loadMore.bind(this);
    this.showYear=this.showYear.bind(this);
  }
  componentDidMount() {
    this.props.getMovieData(1);
}
showYear(e){
let year=new Set();
this.props.data.map((item)=>{
  year.add(item.Year)
})
let array = Array.from(year);
this.setState({years:array});
console.log(array);
}
loadMore(e) {
    let page=this.state.page;
    page=page+1;
    this.props.getMovieData(this.state.page);
    this.setState({page:page,
                  movies:[]});


  }
  selectedMovie(year){
    let movie=this.props.data.filter((item)=>item.Year==year);
    this.setState({movies:movie})
  }
  onSearchChange(e){
    let data=this.state.movies.length>0?this.state.movies:this.props.data;
    let modifiedArray=data.filter((item)=>{
    return item.Title.toLowerCase().indexOf(e.target.value.toLowerCase())>0
    })
    this.setState({movies:modifiedArray})
    }
  render() {
    let Movie=this.state.movies.length>0?this.state.movies:this.props.data;
    console.log(Movie);
    console.log(this.state.years);
    console.log(this.state.movies);
    return (
      <div className="App">
          <div className="row search-bar"  style={{ textAlign: 'center', padding: '10px' }}> <input style={{width:"400px"}} onChange={this.onSearchChange.bind(this)}/></div>
          <div className="row">
             <div className="col-sm-2">
                <div className="row" style={{ textAlign: 'center' }}><button onClick={this.showYear} className="btn btn-primary">Show Filter</button></div>
                 <ul className="list list-unstyled responsive" style={{ padding: '10px' }}>
                {this.state.years?this.state.years.map((item)=>{
                  return(
                    <li style={{marginTop: "10px"}}>
                       <button onClick={this.selectedMovie.bind(this,item)} className="btn btn-primary">{item}</button>
                    </li>
                  )

                }):null}
                </ul>
            </div>
            <div className="col-sm-10">
               <ul className="list list-inline list-unstyled responsive" style={{ padding: '10px' }}>
                 {Movie?Movie.map((item)=>{
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
    data:[].concat(...state.data)
  }

}
export default connect(mapStateToProps,{getMovieData})(App);
