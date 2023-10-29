import { Component } from 'react';
import { Data, ViewProps } from '../../types/types';
import './view.css';

class View extends Component<ViewProps, { items: Data[] }> {
  constructor(props: ViewProps) {
    super(props);
  }

  public render(): JSX.Element {
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
  }
}

export default View;
