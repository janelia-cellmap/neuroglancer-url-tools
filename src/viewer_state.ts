export interface CoordinateSpace {
    [key: string]: [number, string]
}

export interface CoordinateSpaceTransform {            
        outputDimensions: CoordinateSpace,        
        inputDimensions?: CoordinateSpace,
        matrix?: number[][],
        sourceRank?: number
}

export interface LayerDataSource {    
        url: string,
        CoordinateSpaceTransform: CoordinateSpaceTransform,
        enableDefaultSubsources?: boolean
}

export interface skeletonRenderingOptions {
    shader?: string;
    shaderControls?: Map<string, number>;
    mode2d?: string;
    lineWidth2d?: number;    
    mode3d?: string;
    lineWidth3d?: number;    
}


export class Layer{
    type: string;
    tab?: string;
    pick?: boolean;
    tool?: string;
    name?: string
    constructor(
        type: string,
        tab: string='source',
        pick?: boolean,
        tool?: string,
        name?: string
        ){
            this.type = type;
            this.tab = tab;
            this.pick = pick;
            this.tool = tool
            this.name = name;
        }
}

export class ImageLayer extends Layer {    
    source: LayerDataSource | LayerDataSource[];         
    shader?: string;
    shaderControls?: Map<string, number>;
    opacity?: number;
    blend?: string;    
    crossSectionRenderScale?: number;
    constructor(                       
        tab: string | undefined,
        pick: boolean | undefined,
        tool: string | undefined,
        name: string | undefined,
        source: LayerDataSource | LayerDataSource[],        
        opacity: number | undefined = 0.5,
        blend?: string,
        shader?: string,
        shaderControls?: Map<string, number>,
        crossSectionRenderScale: number | undefined = 1) {
            super('image', tab, pick, tool, name)
            this.source = source;
            this.blend = blend;
            this.opacity = opacity;
            this.shader = shader;
            this.shaderControls = shaderControls;
            this.crossSectionRenderScale = crossSectionRenderScale;
         }
}

export class SegmentationLayer extends Layer {    
    source: LayerDataSource | LayerDataSource[];    
    segments?: number[];
    equivalences?: Array<number[]>;
    hideSegmentZero?: boolean;
    selectedAlpha?: number;
    notSelectedAlpha?: number;
    objectAlpha?: number;
    saturation?: number
    ignoreNullVisibleSet?: boolean;
    skeletonRendering?: skeletonRenderingOptions;    
    colorSeed?: number;
    crossSectionRenderScale?: number;
    meshRenderScale?: number;
    meshSilhouetteRendering?: number;
    segmentQuery?: string;
    constructor(        
        source: LayerDataSource | LayerDataSource[],       
        tab?: string,
        pick?: boolean,
        tool?: string,
        name? : string,
        segments?: number[] ,
        equivalences?: Array<number[]>,
        hideSegmentZero?: boolean,
        selectedAlpha?: number,
        notSelectedAlpha?: number,
        objectAlpha?: number,
        saturation?: number,
        ignoreNullVisibleSet?: boolean,
        skeletonRendering?: skeletonRenderingOptions,
        colorSeed?: number,
        crossSectionRenderScale?: number,
        meshRenderScale?: number,
        meshSilhouetteRendering?: number,
        segmentQuery?: string,
        ) 
        {
            super('segmentation', tab, pick, tool, name)
            this.source = source;            
            this.segments = segments;
            this.equivalences = equivalences;
            this.saturation = saturation;
            this.hideSegmentZero = hideSegmentZero;
            this.selectedAlpha = selectedAlpha;
            this.notSelectedAlpha = notSelectedAlpha;
            this.objectAlpha = objectAlpha;
            this.ignoreNullVisibleSet = ignoreNullVisibleSet;
            this.skeletonRendering = skeletonRendering;
            this.colorSeed = colorSeed;
            this.crossSectionRenderScale = crossSectionRenderScale;
            this.meshRenderScale = meshRenderScale;
            this.meshSilhouetteRendering = meshSilhouetteRendering;
            this.segmentQuery = segmentQuery
         }
}

export class SingleMeshLayer extends Layer{
    source: LayerDataSource[];
    vertexAttributeSources?: string[];
    shader: string;
    vertexAttributeNames?: string[];
    constructor(
        tab: string,
        pick: boolean | undefined,
        tool: string | undefined,
        source: LayerDataSource[],
        shader: string,
        vertexAttributeSources?: string[],
        vertexAttributeNames?: string[]){
            super('mesh', tab, pick, tool)
            this.source = source;
            this.shader=  shader;
            this.vertexAttributeSources=vertexAttributeSources;
            this.vertexAttributeNames=vertexAttributeNames;
        }
}

export class ManagedLayer{
    name: string;
    layer: ImageLayer | SegmentationLayer;
    constructor(
        name: string, 
        layer: ImageLayer | SegmentationLayer){
        this.name = name;
        this.layer = layer;
    }
}

export interface SelectedLayerState{
    visible?: boolean;
    size?: number;
    layer?: string
}

export interface StatisticsDisplayState{
    visible?: boolean;
    size?: number;
}

export class ViewerState {
        dimensions: CoordinateSpace;
        dimensionRenderScales?: Map<string, number>;
        position?: number[];
        crossSectionScale?: number;
        crossSectionDepth?: number;
        crossSectionOrientation?: number[];
        projectionScale?: number;
        projectionDepth?: number;
        projectionOrientation?: number[];
        showSlices?: boolean;
        showAxisLines?: boolean;
        showDefaultAnnotations?: boolean;
        gpuMemoryLimit?: number;
        systemMemoryLimit?: number;
        concurrentDownloads?: number;
        prefetch?: boolean = true;
        layers: Layer[];
        layout: string;
        crossSectionBackgroundColor?: string;
        projectionBackgroundColor?: string;
        selectedLayer?: SelectedLayerState; 
        statistics?: StatisticsDisplayState;

    constructor(
        dimensions: CoordinateSpace,        
        position: number[] | undefined,
        layers: Layer[],
        layout: string,
        dimensionRenderScales?: Map<string, number>,        
        crossSectionScale?: number,
        crossSectionDepth?: number,
        crossSectionOrientation?: number[],
        projectionScale?: number,
        projectionDepth?: number,
        projectionOrientation?: number[],
        showSlices: boolean | undefined= true,
        showAxisLines: boolean | undefined = true,
        showDefaultAnnotations: boolean | undefined = true,
        gpuMemoryLimit?: number,
        systemMemoryLimit?: number,
        concurrentDownloads?: number,
        prefetch: boolean | undefined = true,        
        crossSectionBackgroundColor?: string,
        projectionBackgroundColor?: string,
        selectedLayer?: SelectedLayerState, 
        statistics?: StatisticsDisplayState
    ) {
        this.dimensions = dimensions;
        this.dimensionRenderScales = dimensionRenderScales;
        this.position = position;
        this.crossSectionScale = crossSectionScale;
        this.crossSectionDepth = crossSectionDepth;
        this.crossSectionOrientation = crossSectionOrientation;
        this.projectionScale = projectionScale;
        this.projectionDepth = projectionDepth,
        this.projectionOrientation = projectionOrientation;
        this.showSlices= showSlices;
        this.showAxisLines = showAxisLines;
        this.showDefaultAnnotations = showDefaultAnnotations;
        this.gpuMemoryLimit = gpuMemoryLimit;
        this.systemMemoryLimit = systemMemoryLimit;
        this.concurrentDownloads = concurrentDownloads;
        this.prefetch = prefetch;
        this.layers = layers;
        this.layout = layout;
        this.crossSectionBackgroundColor = crossSectionBackgroundColor;
        this.projectionBackgroundColor = projectionBackgroundColor;
        this.selectedLayer = selectedLayer; 
        this.statistics = statistics;  
     }
}

