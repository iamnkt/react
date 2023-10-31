import { Component } from 'react';
import { Data, ViewProps } from '../../types/types';
import { ThreeDots } from 'react-loader-spinner';
import './view.css';

class View extends Component<ViewProps, { items: Data[] }> {
  constructor(props: ViewProps) {
    super(props);
  }

  public renderElement(): JSX.Element {
    if (this.props.data.length)
      return (
        <div className="items">
          {this.props.data.map((item: Data) => (
            <div className="item" key={item.id}>
              <h4 className="title">{item.name}</h4>
              <img className="image" src={item.image}></img>
            </div>
          ))}
        </div>
      );
    return (
      <div className="nothing">
        <h3 className="nothing-caption">No cards were found</h3>
      </div>
    );
  }

  public render(): JSX.Element {
    if (this.props.loading) {
      return (
        <div className="spinner">
          <ThreeDots
            height="80"
            width="80"
            radius="9"
            color="#FFC759"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
          />
        </div>
      );
    } else {
      return this.renderElement();
    }
  }
}

export default View;
