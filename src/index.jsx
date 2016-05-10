// TODO use visible state instead of options list

import React from 'react';
import Input from 'hire-forms-input';
import Options from 'hire-forms-options';
import { stringOrKeyValueMap, arrayOfStringsOrArrayOfKeyValueMaps } from 'hire-forms-prop-types';
import { castKeyValueArray, isKeyValueMap } from 'hire-forms-utils';

let divStyle = { position: 'relative' };

class ListFilter extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			options: this.props.options,
			query: '',
		};
	}

	componentWillReceiveProps(nextProps) {
		this.setState({ options: nextProps.options });
	}

	handleInputChange(inputValue) {
		// Return empty options if inputValue length is beneath a treshold.
		if (inputValue.length < this.props.minLength) {
			return this.setState({
				inputValue,
				options: [],
			});
		}

		return this.filter(inputValue);
	}

	filter(inputValue) {
		const options = this.props.options.filter((value) => {
			const val = isKeyValueMap(value) ?
				value.value :
				value;

			return (val.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
		});

		this.setState({
			query: inputValue,
			options,
		});
	}

	handleInputKeyDown(ev) {
		// Up
		if (ev.keyCode === 38) {
			this.refs.options.highlightPrev();
		}

		// Down
		if (ev.keyCode === 40) {
			this.refs.options.highlightNext();
		}

		// Enter
		if (ev.keyCode === 13) {
			this.refs.options.select();
		}

		// Escape
		if (ev.keyCode === 27) {
			this.clear();
		}
	}

	handleOptionsChange(value) {
		const opts = this.props.options;

		if (typeof opts[0] === 'string') {
			value = value.value;
		}

		this.props.onChange(value);
	}

	render() {
		return (
			<div
				className="hire-list-filter"
				style={divStyle}
			>
				<Input
					onChange={this.handleInputChange.bind(this)}
					onKeyDown={this.handleInputKeyDown.bind(this)}
					placeholder={this.props.placeholder}
					ref="input"
					value={this.state.query}
				/>
				{this.props.children}
				<Options
					onChange={this.handleOptionsChange.bind(this)}
					query={this.state.query}
					ref="options"
					value={this.props.value}
					values={castKeyValueArray(this.state.options)}
				/>
			</div>
		);
	}
}

ListFilter.propTypes = {
	children: React.PropTypes.element,
	minLength: React.PropTypes.number,
	onChange: React.PropTypes.func,
	options: arrayOfStringsOrArrayOfKeyValueMaps,
	placeholder: React.PropTypes.string,
	value: stringOrKeyValueMap,
};

export default ListFilter;
