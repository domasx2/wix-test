import React, {Component} from 'react';
import {Render} from 'matter-js';

export default class Renderer extends Component {

    constructor(props) {
        super(props);
        this.onResize_bound = this.onResize.bind(this);
    }

    componentDidMount() {
        window.addEventListener('resize', this.onResize_bound);
        this.initRender();
    }

    destroyRender() {
        if (this.render_instance) {
            Render.stop(this.render_instance);
            if (this.refs.renderer) {
                this.refs.renderer.removeChild(this.render_instance.canvas);
            }
            this.render_instance = null;
        }
    }

    initRender() {
        this.destroyRender();
        this.render_instance = Render.create({
            engine: this.props.game.engine,
            element: this.refs.renderer,
            options: {
                ...this.getViewportSize()
            }
        });

        Render.run(this.render_instance);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.onResize_bound);
        this.destroyRender();
    }

    onResize() {
        this.initRender();
    }

    getViewportSize() {
        return {
            width: window.innerWidth,
            height: window.innerHeight
        };
    }

    render() {
        return (
            <div className="renderer" ref="renderer">
            </div>
        );
    }
}