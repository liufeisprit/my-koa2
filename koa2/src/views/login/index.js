import React, { Component } from "react";
import { request } from "../../lib";
import { Form, Icon, Input, Button ,message} from "antd";

const FormItem = Form.Item
import "./index.sass";
@Form.create()
export default class MovieDetail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			type:0,
		};
	}
	_toggleLoading = (status = false) => {
		this.setState({
		  loading: status
		})
	}
	handleSetType=(type)=>{
		this.setState({
			type
		  })
	}
	handleSubmit = (e) => {
		e.preventDefault()
		const {type}=this.state
		console.log(this.state.type)
		this.props.form.validateFields(async (err, values) => {
		  if (!err) {
			request(this._toggleLoading)({
			  method: 'post',
			  url: `/admin/${type==0?'login':'register'}`,
			  data: {
				...values
			  }
			})
			  .then(res => {
				message.success({content:'注册成功',onClose:()=>{
					this.props.history.replace('/admin/list')
				}})
			  })
		  }
		})
	}
	render() {
		const { getFieldDecorator } = this.props.form
		return (
			<div>
				<Form onSubmit={this.handleSubmit} className="login-form">
					<h3 style={{ textAlign: "center" }}>预告片后台</h3>
					<FormItem>
						{getFieldDecorator("email", {
							rules: [{ required: true, message: "Please input your email!" }]
						})(
							<Input
								prefix={<Icon type="user" style={{ fontSize: 13 }} />}
								placeholder="Email"
							/>
						)}
					</FormItem>
					<FormItem>
						{getFieldDecorator("password", {
							rules: [
								{ required: true, message: "Please input your password!" }
							]
						})(
							<Input
								prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
								type="password"
								placeholder="Password"
							/>
						)}
					</FormItem>
					<FormItem>
						<Button
							style={{width:'100%'}}
							htmlType="submit"
							type='primary'
							loading={this.state.loading}
							onClick={()=>this.handleSetType(0)}
						>
							Log in
            			</Button>
						
					</FormItem>
					<FormItem>
						<Button
							style={{width:'100%'}}
							type='primary'
							htmlType="submit"
							loading={this.state.loading}
							onClick={()=>this.handleSetType(1)}
						>
							sign up
            			</Button>
					</FormItem>
				</Form>
			</div>
		);
	}
}
