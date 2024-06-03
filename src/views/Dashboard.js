
import { useState, useEffect } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react plugin used to create charts
import { Line, Bar,  } from "react-chartjs-2";

// reactstrap components
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Row,
  Col,
} from "reactstrap";
// get data
import { getData } from "variables/readCSV";
// core components
import {
  linechar1,
  barChartOptions,
  ChartExample1,
  chartExample3,
} from "variables/charts.js";

function Dashboard(props) {

  const [selectedTime, setSelectedTime] = useState("IV-2014");

  async function fetchData(time) {
    const dataSelectedTime = await getData(time);
    //console.log(dataSelectedTime);
    setData(dataSelectedTime);
  }


  const [data, setData] = useState([]);
  useEffect(() => {
    fetchData(selectedTime);
  }, []);

  const handleChangeSelectedTime = async (time) => {
    setSelectedTime(time);
    fetchData(time);
  }

  const [timeType, setTimeType] = useState("quarter");


  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const quarters = [
    'IV-2014', 'I-2015', 'II-2015', 'III-2015', 'IV-2015',
    'I-2016', 'II-2016', 'III-2016', 'IV-2016',
    'I-2017', 'II-2017', 'III-2017', 'IV-2017',
    'I-2018'
  ];

  const years = [
    '2014', '2015', '2016', '2017', '2018'
  ];

  const [dropdownItems, setDropdownItems] = useState(quarters);

  const handleChangeTimeType = async (type) => {
    if(type === "quarter") {
      setDropdownItems(quarters);
      handleSelect("IV-2014");
    }
    if(type === "year") {
      setDropdownItems(years);
      handleSelect("2014");
    }
    if(type === "Total") {
      setDropdownItems([]);
      handleSelect("Total");
    }
    
    setTimeType(type);
  };



  const handleSelect = (time) => {
    //console.log(time);
    handleChangeSelectedTime(time);
  };

  const dropdownMenuStyle = {
    maxHeight: '200px',
    overflowY: 'auto',
    backgroundColor: '#1e1e2f',
    color: '#f8f5f3'
  };

  const dropdownItemStyle = {
    backgroundColor: '#1e1e2f',
    color: '#f8f5f3'
  };

  return (
    <>
      <div className="content">
        <Row>
          <Col xs="12">
            <Card className="card-chart">
              <CardHeader>
                <Row>
                  <Col className="text-left" sm="6">
                  
                    <h5 className="card-category">
                    Apple Stock</h5>
                    <CardTitle tag="h2">
                    <i className="tim-icons icon-chart-bar-32 text-info" />{" "}
                    Trend
                    </CardTitle>
                    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                      <DropdownToggle caret>{selectedTime}</DropdownToggle>
                      <DropdownMenu style={dropdownMenuStyle}>
                        {dropdownItems.map((dropdownItem, index) => (
                          <DropdownItem
                            key={index}
                            onClick={() => handleSelect(dropdownItem)}
                            style={dropdownItemStyle}
                          >
                            {dropdownItem}
                          </DropdownItem>
                        ))}
                      </DropdownMenu>
                    </Dropdown>
                  </Col>
                  <Col sm="6">
                    <ButtonGroup
                      className="btn-group-toggle float-right"
                      data-toggle="buttons"
                    >

                      <Button
                        tag="label"
                        className={classNames("btn-simple", {
                          active: timeType === "quarter",
                        })}
                        color="info"
                        id="0"
                        size="sm"
                        onClick={() => handleChangeTimeType("quarter")}
                      >
                        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                          By quarter
                        </span>
                        <span className="d-block d-sm-none">
                          <i className="tim-icons icon-single-02" />
                        </span>
                      </Button>
                      <Button
                        color="info"
                        id="1"
                        size="sm"
                        tag="label"
                        className={classNames("btn-simple", {
                          active: timeType === "year",
                        })}
                        onClick={() => handleChangeTimeType("year")}
                      >
                        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                          By year
                        </span>
                        <span className="d-block d-sm-none">
                          <i className="tim-icons icon-gift-2" />
                        </span>
                      </Button>
                      <Button
                        color="info"
                        id="2"
                        size="sm"
                        tag="label"
                        className={classNames("btn-simple", {
                          active: timeType === "Total",
                        })}
                        onClick={() => handleChangeTimeType("Total")}
                      >
                        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                          All dataset
                        </span>
                        <span className="d-block d-sm-none">
                          <i className="tim-icons icon-tap-02" />
                        </span>
                      </Button>
                    </ButtonGroup>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Line
                    data={ChartExample1(data, selectedTime)}
                    options={linechar1}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col xs="12">
            <Card className="card-chart">
              <CardHeader>
                {/*<h5 className="card-category">Volumn exchange</h5>*/}
                <CardTitle tag="h3">
                  <i className="tim-icons icon-money-coins text-primary" />{" "}
                  High-Low-Volume
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Bar
                    data={chartExample3(data, selectedTime)}
                    options={barChartOptions}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Dashboard;
