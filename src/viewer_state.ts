export interface Space {
    [key: string]: [number, string]
}

export class Transform {
    constructor(
        readonly matrix: number[][],
        readonly outputDimensions: Space,
        readonly inputDimensions: Space) { }
}

export class LayerDataSource {
    constructor(
        readonly url: string,
        readonly transform: Transform,
        readonly enableDefaultSubsources?: boolean) { }
}

export interface skeletonRendering {
    readonly mode2d: string;
    readonly mode3d: string
}

export class Layer {
    readonly type: string;
    readonly source: LayerDataSource | LayerDataSource[];
    readonly tab: string;
    readonly name: string;
    readonly blend: string;
    readonly skeletonRendering?: skeletonRendering;
    readonly shader?: string;
    constructor(
        type: string,
        source: LayerDataSource | LayerDataSource[],       
        tab: string = "source", 
        name: string,
        blend: string = "default",
        skeletonRendering?: skeletonRendering,
        shader?: string) {
            this.type = type;
            this.source = source;
            this.tab = tab;
            this.name = name;
            this.blend = blend;
            if (this.type == "image") {this.shader = shader}
            if (this.type == "segmentation") {this.skeletonRendering = skeletonRendering}
         }
}


export class ViewerState {
    constructor(
        readonly dimensions: Space,
        readonly position: number[],
        readonly crossSectionOrientation: number[],
        readonly crossSectionScale: number[],
        readonly projectionOrientation: number[],
        readonly projectionScale: number[],
        readonly layers: Layer[],
        readonly selectedLayer: string
    ) { }
}

