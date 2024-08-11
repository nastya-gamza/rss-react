import '@testing-library/jest-dom';
import { server } from './app/src/__mocks__/msw/server';

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());
