import React, { Component } from 'react';
import API from "../../utils/API";
import { Bar } from 'react-chartjs-2';
import { Button } from "reactstrap";
import { Link } from "react-router-dom"



class Chart extends Component {

    state = {
        loggedIn: false,
        user: null,
       
	}

	componentDidMount() {
		API.isLoggedIn().then(user => {
			if (user.data.loggedIn) {
				this.setState({
					loggedIn: true,
					user: user.data.user
				});
			}
		}).catch(err => {
			console.log(err);
		});
		//console.log(this.props)
	}


    constructor(props) {
        super(props);
        this.state = {
            chartData: {
                labels: [],
                datasets: [{
                    label: 'Cars Parked by Day',
                    data: [],
                    backgroundColor: [
                        'rgb(17, 180, 134)',
                        'rgb(17, 180, 134)',
                        'rgb(17, 180, 134)',
                        'rgb(17, 180, 134)',
                        'rgb(17, 180, 134)'
                    ]

                }]
            }

        }
    }

    componentWillMount() {
        console.log('Chart.componentWillMount')
        this.load()
    }

    load() {
        console.log('Chart.load')
        let from = '2019-08-19'
        let to = '2019-08-26'
        API.statsVehicle(from, to).then((response) => {
            //console.log('statsVehicle resolve' + JSON.stringify(response))
            let {data, labels} = response.data;
            let {chartData} = this.state;
            chartData.labels = labels;
            chartData.datasets[0].data = data;
            this.setState({chartData})
        })
    }

    render() {
        return (
        <div className="container chartBox dashboardPage">
            {this.state.loggedIn ? (
            <div className="row">
                <div className='chart col-md-11'>
                    <Bar
                        data={this.state.chartData}
                        width={100}
                        height={50}
                        options={{
                            title: {
                                display: true,
                                text: 'Weekly Report',
                                fontSize: 25
                            },
                            legend: {
                                display: true,
                                position: 'right'
                            },
                            scales: {
                                yAxes: [{
                                    ticks: {
                                        beginAtZero: true,
                                        steps: 1,
                                        stepSize: 1,
                                        stepValue: 1,
                                        // max: 200
                                    }
                                }]
                            }
                        }}
                    />
                    </div>
                </div>
                ) :
                (
                    <div className="noUser">
                        {!this.state.loading ? (
                            <>
                                <h4>Please login to continue...</h4>
                                <Link className="loginLink" to="/login"><Button className="loginBtn" color=".bg-success" block>Login</Button></Link>
                            </>
                        ) : (
                                <img id="loadingIcon" src="./assets/images/loading.gif" alt="loading" />
                            )}
                    </div>
                )}
            <br/><br/><br/><br/><br/>  
            </div>
        )
    }
}

export default Chart;


