import React from "react";
import ContentLoader from "react-content-loader";

const Loader = (props) => (
    <ContentLoader
        speed={2}
        width={476}
        height={230}
        viewBox="0 0 476 230"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
    >
        <rect x="15" y="128" rx="3" ry="3" width="380" height="6" />
        <circle cx="33" cy="29" r="20" />
        <rect x="15" y="153" rx="3" ry="3" width="141" height="5" />
        <rect x="16" y="201" rx="3" ry="3" width="141" height="5" />
        <rect x="14" y="63" rx="3" ry="3" width="141" height="5" />
        <rect x="16" y="87" rx="3" ry="3" width="435" height="6" />
        <rect x="15" y="178" rx="3" ry="3" width="52" height="6" />
        <rect x="14" y="108" rx="3" ry="3" width="410" height="6" />
        <rect x="69" y="21" rx="3" ry="3" width="164" height="6" />
    </ContentLoader>
);

export default Loader;
