import React from "react";
import AppNavBar from "./AppNavBar";

const Details = () => {

    return (
        <div>
            <AppNavBar/>
            <div className="page">
                <div className="page__inner">
                    <div className="custom-container container_responsive">
                        <div className="media-container">
                            <div className="media-sidebar">
                                <div className="section">
                                    <div className="media-sidebar__cover paper">
                                        <img src="" alt="test" width="250px" height="350px"/>
                                    </div>
                                </div>
                                <div className="media-sidebar__buttons section">
                                    <a className="button button_block button_primary" href="#">
                                        Start reading
                                    </a>
                                    <button className="button button_block button_label button_primary">
                                        <div className="text-truncate">Add to the list</div>
                                    </button>
                                </div>
                                <div className="media-info-list paper">
                                    <a className="media-info-list__item" href="#">
                                        <div className="media-info-list__title">Year of issue</div>
                                        <div className="media-info-list__value">{}</div>
                                    </a>
                                    <a className="media-info-list__item" href="#">
                                        <div className="media-info-list__title">Author</div>
                                        <div className="media-info-list__value">{}</div>
                                    </a>
                                </div>
                            </div>

                            <div className="media-content media-content_side">
                                <div className="media-name section">
                                    <div className="media-name__body">
                                        <div className="media-name__main">
                                            Test
                                        </div>
                                    </div>
                                    <div className="media-rating-wrap">
                                        <div className="media-rating media-rating_lg">

                                        </div>
                                        <div className="button button_sm button_white media-rating-wrap__btn">
                                            <span>
                                                <i></i>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="tabs paper">
                                    <div className="media-tabs">
                                        <div className="tabs__wrapper">
                                            <ul className="tabs__list">
                                                <li className="tabs__item">Info</li>
                                                <li className="tabs__item">Chapters</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="tabs__content">
                                        <div className="media-section media-section_info">
                                            <div className="media-description">
                                                <div className="media-description__text">
                                                    {

                                                    }
                                                </div>
                                            </div>
                                            <div className="media-tags">
                                                <a className="media-tag-item">test</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <footer className="footer paper">
                    <div className="footer__inner custom-container">

                    </div>
                </footer>
            </div>
        </div>
    )
}

export default Details;