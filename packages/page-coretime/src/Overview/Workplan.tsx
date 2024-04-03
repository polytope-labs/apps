// Copyright 2017-2024 @polkadot/app-assets authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { CoreWorkplanInfo } from '../types.js';

import React from 'react';
import { MaskCoverage } from '@polkadot/react-components';
import { hexToBin } from '../utils.js';
import { Table } from '@polkadot/react-components';

interface Props {
  className?: string;
  value: CoreWorkplanInfo;
}

function Workload({ className, value: { core, info, timeslice } }: Props): React.ReactElement<Props> {
  const trimmedHex: string = info[0].mask.toHex().slice(2);
  console.log(trimmedHex)
  const arr: string[] = trimmedHex.split("");

  let buffArr: string[] = [];

  arr.forEach((bit) => {
    hexToBin(bit).split("").forEach((v) => buffArr.push(v))
  })

  const sanitizedAssignment = info[0].assignment.isTask ? info[0].assignment.asTask : info[0].assignment;

  return (
    <tr className={className}>
      <Table.Column.Id value={Number(core)} />
      <td><MaskCoverage values={buffArr} /></td>
      <td className='start media--1600'>{sanitizedAssignment.toString()}</td>
      <td className='start media--1900'>{timeslice.toString()}</td>
    </tr>
  );
}

export default React.memo(Workload);