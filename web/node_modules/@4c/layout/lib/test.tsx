// TypeScript Version: 3.2

import * as React from 'react';
import Layout from '@4c/layout';

<Layout />;
<Layout direction="column" reverse />;

<Layout align="start" grow />;
<Layout display="block" grow />;
<Layout display="block" align="start" />; // $ExpectError

<Layout.Flex align="start" grow />;

<Layout.Block grow />;
<Layout.Block align="start" />; // $ExpectError

<Layout.Spacer />;
<Layout.Spacer grow />; // $ExpectError

interface FooProps {
  foo: boolean;
}

function Foo({ foo }: FooProps) {
  return null;
}

<Layout foo />; // $ExpectError
<Layout.Flex foo />; // $ExpectError
<Layout.Block foo />; // $ExpectError

<Layout as={Foo} />; // $ExpectError
<Layout.Flex as={Foo} />; // $ExpectError
<Layout.Block as={Foo} />; // $ExpectError

<Layout as={Foo} foo />;
<Layout.Flex as={Foo} foo />;
<Layout.Block as={Foo} foo />;

<Layout.Spacer as={Foo} foo />; // $ExpectError
