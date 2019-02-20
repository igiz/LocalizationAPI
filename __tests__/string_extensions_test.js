require('../model/string_extensions');

test('Format tests - single token at end', () => {
    expect('My token is {0}'.format("test-token")).toBe('My token is test-token')
});

test('Format tests - single token at start', () => {
    expect('{0} is my token.'.format("test-token")).toBe('test-token is my token.')
});

test('Format tests - single token in middle', () => {
    expect('My token {0} is a token'.format("test-token")).toBe('My token test-token is a token')
});

test('Format tests - two tokens', () => {
    expect('My {0} is {1}'.format("token", "test-token")).toBe('My token is test-token')
});

test('Format tests - token inside token', () => {
    expect('My token is {0}'.format("test{0}token")).toBe('My token is test{0}token')
});

test('Format tests - token used multiple times', () => {
    expect('My {0} is {0}'.format("token")).toBe('My token is token')
});