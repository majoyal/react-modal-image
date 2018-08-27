import React, { Component } from 'react';

import { smallImage } from './styles';
import Lightbox from './Lightbox';

export { default as Lightbox } from './Lightbox';

export default class extends Component {
    state = { modalOpen: false };

    toggleModal = () => {
        this.setState(prevState => ({
            modalOpen: !prevState.modalOpen
        }));
    };

    render() {
        const { className, small, smallSrcSet, medium, large, alt, containerStyle, imageStyle, renderTrigger, onClick } = this.props;
        const { modalOpen } = this.state;
        const imageProps = {
            className,
            style: { ...smallImage, ...imageStyle },
            src: small,
            srcSet: smallSrcSet,
            alt,
        };

        if (typeof renderTrigger !== 'function') {
            imageProps.onClick = this.toggleModal;
        } else if (typeof onClick === 'function') {
            imageProps.onClick = onClick;
        }

        return (
            <div style={containerStyle}>
                <img {...imageProps} />
                {renderTrigger && renderTrigger(this.toggleModal)}
                {modalOpen && (
                    <Lightbox
                        medium={medium}
                        large={large}
                        alt={alt}
                        onClose={this.toggleModal}
                    />
                )}
            </div>
        );
    }
}
