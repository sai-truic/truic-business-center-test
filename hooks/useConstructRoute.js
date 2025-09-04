import routes from '../routes.json';
import { useRouter } from "next/router"; //TODO: Replace with the router from useInputState()

const useConstructRoute = (router, ...args) => {
    const basePath = router.asPath.split('?')[0]
    const pathSegments = basePath.split('/');
    const lastSegment = pathSegments[pathSegments.length - 1];

    // Retrieve the route configuration for the last segment
    const routeConfig = routes[lastSegment] || {};

    // Convert the arguments to an object
    const params = args.reduce((acc, arg, index) => {
        const key = Object.keys(routeConfig)[index];
        if (key) acc[key] = arg;
        return acc;
    }, {});

    // Filter parameters to include only those present in the route configuration
    let queryParams = Object.entries(params)
        .filter(([key]) => routeConfig.hasOwnProperty(key))
        .map(([key, value]) => `${key}=${value}`)
        .join('&');

    return `${basePath}?${queryParams}`;
};

export default useConstructRoute;