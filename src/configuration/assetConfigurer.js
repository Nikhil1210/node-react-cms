import Path from 'path';
import express from 'express';

const ROOT='../../dist';
const STATIC_DIRS = ['public'];
const STATIC_ROOT = '/assets';
const adjustStaticDirs = dirs =>dirs.map(dir =>Path.resolve(__dirname, ROOT, dir));
const configureAssets = app => adjustStaticDirs(STATIC_DIRS).forEach(dir => 
    app.use(STATIC_ROOT, express.static(dir, {maxAge: '1d'}))
);

export default configureAssets;