import { Component } from 'react';
import { Data, ViewProps } from '../../types/types';

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
            <p className="description">{item.description}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default View;
