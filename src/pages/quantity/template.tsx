import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Container, Columns } from 'bloomer';
import PageWithTransitions from 'components/hoc/pageWithTransitions';
import ZoomableChart from 'components/hoc/zoomableChart';
import BarWithLine from 'components/chart/barWithLine';
import Stacked from 'components/chart/stacked';
import Bar from 'components/chart/bar';
import 'styles/sass/pages/quantity.sass';

interface StateTypes {
  comp: string;
  propsComp: any;
}

const Chart = {
  ZoomableOrderDelivery: ZoomableChart(Stacked),
  ZoomableTransporter: ZoomableChart(BarWithLine),
  ZoomableAverageVolume: ZoomableChart(BarWithLine),
  ZoomableAverageTransporter: ZoomableChart(Bar),
  ZoomableDaysTrip: ZoomableChart(Bar),
  ZoomableTruck: ZoomableChart(Bar),
  ZoomableWeight: ZoomableChart(BarWithLine),
  ZoomableAverageTruck: ZoomableChart(Bar),
  ZoomableTripMonth: ZoomableChart(Bar),
  ZoomableKmTrip: ZoomableChart(Bar),
};

const scrollToRef = ref =>
  ref.current.parentElement.scrollTo(
    ref.current.offsetLeft,
    ref.current.offsetTop,
  );

const Quantity = props => {
  const targetScrollRef = useRef(document.createElement('div'));
  const [components, setComponents] = useState<StateTypes[]>([]);
  const [used, setUsed] = useState<string[]>([]);
  const executeScroll = () => scrollToRef(targetScrollRef);
  const {
    getOrderDelivery,
    getActiveTransporter,
    getAverageVolume,
    getDaysPerTrip,
    getActiveTruck,
    getAverageWeight,
    getAverageOrderPerTransporter,
    getAverageOrderPerTruck,
    getTripPerMonth,
    getKmPerTrip,
  } = props;

  const storeComponent = useCallback(
    (propsComp, comp) => {
      const obj = {
        comp,
        propsComp,
      };

      if (components.length > 1) {
        const newComps = [...components]; // copying the old components array
        const newUsed = [...used];
        newComps[1] = obj; // replace with new value
        newUsed[1] = comp;
        setComponents(newComps);
        setUsed(newUsed);
      } else {
        setComponents(components.concat(obj));
        setUsed(used.concat(comp));
      }

      executeScroll();
    },
    [components, used],
  );

  const removeComponent = useCallback(
    (propsComp, comp) => {
      setComponents(components.filter(c => c.comp !== comp));
      setUsed(used.filter(u => u !== comp));
    },
    [components, used],
  );

  useEffect(() => {
    getOrderDelivery();
    getActiveTransporter();
    getAverageVolume();
    getDaysPerTrip();
    getActiveTruck();
    getAverageWeight();
    getAverageOrderPerTransporter();
    getAverageOrderPerTruck();
    getTripPerMonth();
    getKmPerTrip();
  }, [
    getOrderDelivery,
    getActiveTransporter,
    getAverageVolume,
    getDaysPerTrip,
    getActiveTruck,
    getAverageWeight,
    getAverageOrderPerTransporter,
    getAverageOrderPerTruck,
    getTripPerMonth,
    getKmPerTrip,
  ]);

  const count = components.length;
  const {
    orderDeliveries,
    activeTransporters,
    averageVolumes,
    daysTrips,
    activeTrucks,
    averageWeights,
    averageOrderTransporters,
    averageOrderTrucks,
    tripMonths,
    kmTrips,
  } = props.quantity;
  const { monthYear } = props;

  return (
    <Container isFluid className="p-0">
      <div
        className={`chart-wrapper p-b-20 zoomed-count-${count}`}
        ref={targetScrollRef}
      >
        {count > 0 && (
          <Columns className="zoomed">
            {components.map(c => {
              const Component = Chart[`Zoomable${c.comp}`];
              return (
                <Component
                  key={c.comp}
                  {...c.propsComp}
                  isZoom={!c.propsComp.isZoom}
                  toggleZoom={val => removeComponent(val, c.comp)}
                  height={500}
                />
              );
            })}
          </Columns>
        )}
        <Columns className={`zoomed-count-${count}`}>
          {!used.includes('OrderDelivery') && (
            <Chart.ZoomableOrderDelivery
              title="Order Delivery"
              color="blue"
              toggleZoom={val => storeComponent(val, 'OrderDelivery')}
              isZoom={false}
              data={orderDeliveries}
              chartType="stacked"
              monthYear={monthYear}
            />
          )}
          {!used.includes('Transporter') && (
            <Chart.ZoomableTransporter
              title="Active Transporter"
              color="green"
              barColor="green"
              lineColor="blue"
              toggleZoom={val => storeComponent(val, 'Transporter')}
              isZoom={false}
              data={activeTransporters}
              chartType="bar-with-line"
              monthYear={monthYear}
            />
          )}
          {!used.includes('AverageVolume') && (
            <Chart.ZoomableAverageVolume
              title="Average Volume"
              color="orange"
              barColor="darkGreen"
              lineColor="orange"
              toggleZoom={val => storeComponent(val, 'AverageVolume')}
              isZoom={false}
              data={averageVolumes}
              chartType="bar-with-line"
              monthYear={monthYear}
            />
          )}
          {!used.includes('AverageTransporter') && (
            <Chart.ZoomableAverageTransporter
              title="Average Order / Transporter"
              color="darkPurple"
              toggleZoom={val => storeComponent(val, 'AverageTransporter')}
              isZoom={false}
              data={averageOrderTransporters}
              chartType="bar"
              monthYear={monthYear}
            />
          )}
          {!used.includes('DaysTrip') && (
            <Chart.ZoomableDaysTrip
              title="Days / Trip"
              color="maroon"
              toggleZoom={val => storeComponent(val, 'DaysTrip')}
              isZoom={false}
              data={daysTrips}
              chartType="bar"
              monthYear={monthYear}
            />
          )}
          {count === 0 && <div className="break-flex" />}
          {!used.includes('Truck') && (
            <Chart.ZoomableTruck
              title="Active Truck"
              color="cyan"
              toggleZoom={val => storeComponent(val, 'Truck')}
              isZoom={false}
              data={activeTrucks}
              chartType="bar"
              monthYear={monthYear}
            />
          )}
          {!used.includes('Weight') && (
            <Chart.ZoomableWeight
              title="Average Weight"
              color="purple"
              barColor="purple"
              lineColor="darkPurple"
              toggleZoom={val => storeComponent(val, 'Weight')}
              isZoom={false}
              data={averageWeights}
              chartType="bar-with-line"
              monthYear={monthYear}
            />
          )}
          {!used.includes('AverageTruck') && (
            <Chart.ZoomableAverageTruck
              title="Average Order / Truck"
              color="pink"
              toggleZoom={val => storeComponent(val, 'AverageTruck')}
              isZoom={false}
              data={averageOrderTrucks}
              chartType="bar"
              monthYear={monthYear}
            />
          )}
          {!used.includes('TripMonth') && (
            <Chart.ZoomableTripMonth
              title="Trip / Month"
              color="lightBlue"
              toggleZoom={val => storeComponent(val, 'TripMonth')}
              isZoom={false}
              data={tripMonths}
              chartType="bar"
              monthYear={monthYear}
            />
          )}
          {!used.includes('KmTrip') && (
            <Chart.ZoomableKmTrip
              title="Km / Trip"
              color="darkGreen"
              toggleZoom={val => storeComponent(val, 'KmTrip')}
              isZoom={false}
              data={kmTrips}
              chartType="bar"
              monthYear={monthYear}
            />
          )}
        </Columns>
      </div>
    </Container>
  );
};

const QuantityComponent = PageWithTransitions(Quantity, 'Quantity');

export default QuantityComponent;
